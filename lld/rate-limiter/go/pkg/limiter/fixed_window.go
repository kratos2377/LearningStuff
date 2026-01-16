package limiter

import (
	"rate-limiter/pkg/enums"
	"rate-limiter/pkg/model"
	"sync"
	"time"
)

type FixedWindowRateLimiter struct {
	BaseRateLimiter
	requestCount map[string]int
	windowStart  map[string]int64
	mu           sync.Mutex
}

func NewFixedWindowRateLimiter(config *model.RateLimitConfig) *FixedWindowRateLimiter {
	return &FixedWindowRateLimiter{
		BaseRateLimiter: BaseRateLimiter{
			Config: config,
			Type:   enums.FixedWindow,
		},
		requestCount: make(map[string]int),
		windowStart:  make(map[string]int64),
	}
}

func (l *FixedWindowRateLimiter) AllowRequest(userId string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	currentReqWindow := time.Now().Unix() / int64(l.Config.WindowInSeconds)

	lastReqWindow, exists := l.windowStart[userId]
	if !exists {
		lastReqWindow = currentReqWindow
	}

	if lastReqWindow != currentReqWindow {
		l.windowStart[userId] = currentReqWindow
		l.requestCount[userId] = 1
		return true
	}

	count := l.requestCount[userId]
	if count < l.Config.MaxRequests {
		l.requestCount[userId] = count + 1
		return true
	}

	return false
}
