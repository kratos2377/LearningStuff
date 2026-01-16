package enums

type UserTier string

const (
	Free    UserTier = "FREE"
	Premium UserTier = "PREMIUM"
)

type RateLimitType string

const (
	TokenBucket          RateLimitType = "TOKEN_BUCKET"
	LeakyBucket          RateLimitType = "LEAKY_BUCKET"
	FixedWindow          RateLimitType = "FIXED_WINDOW"
	SlidingWindowLog     RateLimitType = "SLIDING_WINDOW_LOG"
	SlidingWindowCounter RateLimitType = "SLIDING_WINDOW_COUNTER"
)
