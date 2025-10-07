import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class PriorityBlockingQueueWithMutex<T> {
    private int capacity;
    private int head;
    private int tail;
    private T[] queue;
    private final Lock lock;
    private int size;

    PriorityBlockingQueueWithMutex(int c)
    {
        this.capacity = c;
        int size = 0;
        this.head = 0;
        this.tail = 0;
        this.queue = (T[]) new Object[capacity];
        this.lock = new ReentrantLock();
    }

    public void enqueue(T item)
    {
        lock.lock();

        while (size == capacity)
        {
            System.out.println("going to wait for item - " + item);
            lock.unlock();
            lock.lock();
        }

        if(tail == capacity)
        {
            tail = 0;
        }

        queue[tail] = item;
        System.out.println("mutex enqueue the item - " + queue[tail]);
        tail++;
        size++;

        lock.unlock();
    }

    public T dequeue()
    {
        lock.lock();
        T item = null;
        while (size == 0)
        {
            System.out.println("going to wait to dequeue ");
            lock.unlock();
            lock.lock();
        }

        if(head == capacity)
        {
            head = 0;
        }

        item = queue[head];
        queue[head] = null;
        head++;
        size--;
        lock.unlock();
        return item;

    }

}
