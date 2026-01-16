package model

import "rate-limiter/pkg/enums"

type User struct {
	UserId string
	Tier   enums.UserTier
}

func NewUser(userId string, tier enums.UserTier) *User {
	return &User{
		UserId: userId,
		Tier:   tier,
	}
}
