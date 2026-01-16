package service

import (
	"fmt"
	"rate-limiter/pkg/enums"
	"rate-limiter/pkg/factory"
	"rate-limiter/pkg/limiter"
	"rate-limiter/pkg/model"
)

type RateLimiterService struct {
	rateLimiters map[enums.UserTier]limiter.RateLimiter
}

func NewRateLimiterService() *RateLimiterService {
	service := &RateLimiterService{
		rateLimiters: make(map[enums.UserTier]limiter.RateLimiter),
	}

	// Configure per-tier limits + algorithms
	// Free: Token Bucket, 10 req/min
	tbConfig := model.NewRateLimitConfig(10, 60)
	tbLimiter, _ := factory.CreateRateLimiter(enums.TokenBucket, tbConfig)
	service.rateLimiters[enums.Free] = tbLimiter

	// Premium: Fixed Window, 100 req/min
	fwConfig := model.NewRateLimitConfig(100, 60)
	fwLimiter, _ := factory.CreateRateLimiter(enums.FixedWindow, fwConfig)
	service.rateLimiters[enums.Premium] = fwLimiter

	return service
}

func (s *RateLimiterService) AllowRequest(user *model.User) (bool, error) {
	limiter, exists := s.rateLimiters[user.Tier]
	if !exists {
		return false, fmt.Errorf("no limiter configured for tier: %s", user.Tier)
	}
	return limiter.AllowRequest(user.UserId), nil
}
