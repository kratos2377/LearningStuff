
import java.util.concurrent.Semaphore;

public class PriorityBlockingQueueWithSemaphore<T> {

    private int capacity;
    private int head;
    private int tail;
    private T[] queue;
    private final Semaphore lock;

    private CountingSemaphore semProducer;

    private CountingSemaphore semConsumer;
    private int size;

    PriorityBlockingQueueWithSemaphore(int c)
    {
        this.capacity = c;
        int size = 0;
        this.head = 0;
        this.tail = 0;
        this.queue = (T[]) new Object[capacity];
        this.lock = new CountingSemaphore(1, 1);
        this.semProducer = new CountingSemaphore(c, c);
        this.semConsumer = new CountingSemaphore(c, 0);

    }

    public void enqueue(T item) throws InterruptedException {


        semProducer.acquire();
        lock.acquire();

        if(tail == capacity)
        {
            tail = 0;
        }

        queue[tail] = item;
        System.out.println("semaphore enqueue the item - " + queue[tail]);
        tail++;
        size++;
        lock.release();
        semConsumer.release();
    }

    public T dequeue() throws InterruptedException {

        semConsumer.acquire();
        lock.acquire();

        T item = null;
        if(head == capacity)
        {
            head = 0;
        }

        item = queue[head];
        queue[head] = null;
        head++;
        size--;
        lock.release();
        semProducer.release();
        return item;

    }
}
