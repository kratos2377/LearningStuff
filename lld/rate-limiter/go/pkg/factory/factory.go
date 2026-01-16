package factory

import (
	"fmt"
	"rate-limiter/pkg/enums"
	"rate-limiter/pkg/limiter"
	"rate-limiter/pkg/model"
)

func CreateRateLimiter(algo enums.RateLimitType, config *model.RateLimitConfig) (limiter.RateLimiter, error) {
	switch algo {
	case enums.TokenBucket:
		return limiter.NewTokenBucketRateLimiter(config), nil
	case enums.FixedWindow:
		return limiter.NewFixedWindowRateLimiter(config), nil
	case enums.SlidingWindowLog:
		return limiter.NewSlidingWindowLogRateLimiter(config), nil
	default:
		return nil, fmt.Errorf("unknown algorithm: %s", algo)
	}
}
