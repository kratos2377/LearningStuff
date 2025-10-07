
public class CountingSemaphore extends Semaphore {

    private int toAcquire;
    public CountingSemaphore(int permits, int availablePermit)  {
        super(permits, true);
        this.toAcquire = permits - availablePermit;
        try {
            acquirePermits();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
    private void acquirePermits() throws InterruptedException {
        System.out.println("aquiring permits" + this.toAcquire);
        for (int i = 0; i <this.toAcquire; i++) {
            super.acquire();
        }
        System.out.println("aquired");
    }


}
