package limiter

import (
	"rate-limiter/pkg/enums"
	"rate-limiter/pkg/model"
	"sync"
	"time"
)

type SlidingWindowLogRateLimiter struct {
	BaseRateLimiter
	requestLog map[string][]int64
	mu         sync.Mutex
}

func NewSlidingWindowLogRateLimiter(config *model.RateLimitConfig) *SlidingWindowLogRateLimiter {
	return &SlidingWindowLogRateLimiter{
		BaseRateLimiter: BaseRateLimiter{
			Config: config,
			Type:   enums.SlidingWindowLog,
		},
		requestLog: make(map[string][]int64),
	}
}

func (l *SlidingWindowLogRateLimiter) AllowRequest(userId string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now().Unix()
	
	log, exists := l.requestLog[userId]
	if !exists {
		log = []int64{}
	}

	// Remove expired timestamps
	// While the first element is older than the window, remove it
	validLog := log[:0]
	for _, timestamp := range log {
		if now-timestamp < int64(l.Config.WindowInSeconds) {
			validLog = append(validLog, timestamp)
		}
	}
	log = validLog

	if len(log) < l.Config.MaxRequests {
		log = append(log, now)
		l.requestLog[userId] = log
		return true
	}

	l.requestLog[userId] = log
	return false
}
