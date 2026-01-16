package model

type RateLimitConfig struct {
	MaxRequests     int
	WindowInSeconds int
}

func NewRateLimitConfig(maxRequests int, windowInSeconds int) *RateLimitConfig {
	return &RateLimitConfig{
		MaxRequests:     maxRequests,
		WindowInSeconds: windowInSeconds,
	}
}
