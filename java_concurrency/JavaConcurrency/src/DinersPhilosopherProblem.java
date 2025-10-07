public class DinersPhilosopherProblem {

    Semaphore[] semArray;
    int n;
    Semaphore total;

    DinersPhilosopherProblem(int n)
    {
        this.n = n;
        semArray = new Semaphore[5];
        for(int i =0;i<n;i++)
        {
            semArray[i] = new Semaphore(1);
        }
        total = new Semaphore(n-1);
    }

    private void contemplate() throws InterruptedException {
        Thread.sleep(100);
    }

    private void eat(int i) throws InterruptedException {
        total.acquire();
        semArray[i].acquire();
        semArray[(i+1) % n].acquire();
        System.out.println("Philosopher eating - "+ i);
        Thread.sleep(500);
        semArray[i].release();
        semArray[(i+1) % n].release();
        total.release();
    }

    public void philospherLifeCycle(int i) throws InterruptedException {
        while(true)
        {
            contemplate();
            eat(i);
        }
    }

}

