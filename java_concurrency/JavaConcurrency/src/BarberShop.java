import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Logger;

public class BarberShop {

    private static final Logger LOGGER = Logger.getLogger(BarberShop.class.getName());

    final int size;
    PriorityBlockingQueue<HairCutTask> hairCutQueue;

    AtomicInteger currCust;

    BarberShop(int size)
    {
        this.size = size;
        hairCutQueue = new PriorityBlockingQueue<>(size);
        currCust = new AtomicInteger(0);
    }

    public void startShop()
    {
        Thread barberThread = new Thread(new BarberTask());
        barberThread.start();
    }

    public boolean enterCustomer(String name) throws InterruptedException {
        synchronized (this)
        {
            if( currCust.get() >= size)
            {
                LOGGER.info("Return customer - "+ name);
                return false;
            }
            currCust.incrementAndGet();
        }
        HairCutTask task = new HairCutTask(name);
        hairCutQueue.enqueue(task);
        return true;
    }

    private HairCutTask getNextTask()
    {
        try {
            return this.hairCutQueue.dequeue(); //TODO: in deque function if stuck meaning barber sleeping
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private final class BarberTask implements Runnable
    {
        @Override
        public void run() {
            while (true)
            {
                HairCutTask task;
                while ((task = getNextTask()) != null)
                {
                    task.run();
                }
            }
        }
        //TODO: doubt - how to put timeouts? like if we don't want barber to indefinitely wait
    }



    private final class HairCutTask implements Runnable{

        String custName;

        HairCutTask(String name)
        {
            this.custName = name;
        }

        @Override
        public void run() {
            LOGGER.info("Cutting hair for - " + this.custName);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            finally {
                synchronized (this)
                {
                    currCust.decrementAndGet();
                }
            }
        }
    }

}