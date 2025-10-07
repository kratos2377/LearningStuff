


public class Semaphore {

    int usedPermit;
    int MAX_PERMIT;

    Semaphore(int size)
    {
        this.usedPermit = 0;
        this.MAX_PERMIT = size;
    }

    public synchronized void acquire() throws InterruptedException {
        while(usedPermit == MAX_PERMIT)
            this.wait();
        usedPermit ++;
        this.notifyAll();
    }

    public synchronized void release() throws InterruptedException {
        while (usedPermit == 0)
            this.wait();
        usedPermit --;
        this.notifyAll();
        this.wait();
    }
}
