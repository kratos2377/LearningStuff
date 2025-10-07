public class TokenBucketAlgo {

    long possibleToken;
    long lastQueryTimeStamp;

    long MAX_TOKEN;

    TokenBucketAlgo(long m)
    {
        this.MAX_TOKEN = m;
        this.possibleToken = 0;
        this.lastQueryTimeStamp = System.currentTimeMillis();
    }

    public synchronized void getToken() throws InterruptedException {
        long currTime = System.currentTimeMillis();
        possibleToken+= (currTime - this.lastQueryTimeStamp) / 1000;

        if(possibleToken > MAX_TOKEN)
        {
            possibleToken = MAX_TOKEN;
        }

        if(possibleToken == 0)
        {
            System.out.println("Thread rejecting");
            throw new RuntimeException("Can't allow");
        }else {
            possibleToken --;
        }

        lastQueryTimeStamp = currTime;
        System.out.println("Granting token");

    }


}
