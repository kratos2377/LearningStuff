package limiter

import (
	"rate-limiter/pkg/enums"
	"rate-limiter/pkg/model"
)

type RateLimiter interface {
	AllowRequest(userId string) bool
}

type BaseRateLimiter struct {
	Config *model.RateLimitConfig
	Type   enums.RateLimitType
}
