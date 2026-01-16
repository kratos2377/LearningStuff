package main

import (
	"fmt"
	"rate-limiter/pkg/enums"
	"rate-limiter/pkg/model"
	"rate-limiter/pkg/service"
	"sync"
)

// call allowreq func 20 times simultaneously
func checkConcurrency(rateLimiterService *service.RateLimiterService) {
	freeUser1 := model.NewUser("user1", enums.Free)

	threads := 20 // simulate 20 concurrent requests
	var wg sync.WaitGroup
	
	// Create a channel effectively acting as the CyclicBarrier to coordinate start
	startSignal := make(chan struct{})

	for i := 1; i <= threads; i++ {
		wg.Add(1)
		reqNum := i
		go func() {
			defer wg.Done()
			
			// Wait for signal to start
			<-startSignal

			allowed, err := rateLimiterService.AllowRequest(freeUser1)
			if err != nil {
				fmt.Printf("Error: %v\n", err)
				return
			}
			status := "BLOCKED"
			if allowed {
				status = "ALLOWED"
			}
			fmt.Printf("Request %d for FreeUser1: %s\n", reqNum, status)
		}()
	}

	// Trigger all goroutines
	close(startSignal)
	
	// Wait for all to finish
	wg.Wait()
}

func main() {
	rateLimiterService := service.NewRateLimiterService()
	checkConcurrency(rateLimiterService)
}
