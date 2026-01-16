package limiter

import (
	"math"
	"rate-limiter/pkg/enums"
	"rate-limiter/pkg/model"
	"sync"
	"time"
)

type TokenBucketRateLimiter struct {
	BaseRateLimiter
	tokens         map[string]int
	lastRefillTime map[string]int64
	mu             sync.Mutex
}

func NewTokenBucketRateLimiter(config *model.RateLimitConfig) *TokenBucketRateLimiter {
	return &TokenBucketRateLimiter{
		BaseRateLimiter: BaseRateLimiter{
			Config: config,
			Type:   enums.TokenBucket,
		},
		tokens:         make(map[string]int),
		lastRefillTime: make(map[string]int64),
	}
}

func (l *TokenBucketRateLimiter) AllowRequest(userId string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now().UnixMilli()
	l.refillTokens(userId, now)

	currentTokens, exists := l.tokens[userId]
	if !exists {
		currentTokens = l.Config.MaxRequests
	}

	if currentTokens > 0 {
		l.tokens[userId] = currentTokens - 1
		return true
	}

	return false
}

func (l *TokenBucketRateLimiter) refillTokens(userId string, now int64) {
	refillRate := float64(l.Config.WindowInSeconds) / float64(l.Config.MaxRequests)
	
	lastRefill, exists := l.lastRefillTime[userId]
	if !exists {
		lastRefill = now
	}

	elapsedSeconds := float64(now-lastRefill) / 1000.0
	refillTokens := int(elapsedSeconds / refillRate)

	if refillTokens > 0 {
		currentTokens := l.tokens[userId]
		// If user doesn't exist yet, they start with max requests, but the getOrDefault logic in Java handles this implicitly by defaulting to max. 
		// Here if we haven't seen them, we don't strictly need to refill, but let's be consistent.
		if !exists {
			currentTokens = l.Config.MaxRequests
		}
		
		l.tokens[userId] = int(math.Min(float64(l.Config.MaxRequests), float64(currentTokens+refillTokens)))
		l.lastRefillTime[userId] = now
	}
}
