public class PriorityBlockingQueue<T>{

    private int capacity;
    private int head;
    private int tail;
    private T[] queue;
    private final Object lock;
    private int size;

    public PriorityBlockingQueue(int c)
    {
        this.capacity = c;
        int size = 0;
        this.head = 0;
        this.tail = 0;
        this.queue = (T[]) new Object[capacity];
        this.lock = new Object();
    }

    public void enqueue(T item) throws InterruptedException {
        synchronized (lock)
        {
            if(size == capacity)
            {
                System.out.println("going to wait for item - " + item);
                lock.wait();
            }

            if(tail == capacity)
            {
                tail = 0;
            }

            queue[tail] = item;
            System.out.println("enqueue the item - " + queue[tail]);
            tail++;
            size++;
            lock.notifyAll();
        }
    }

    public T dequeue() throws InterruptedException {
        T item = null;
        synchronized (lock)
        {
            if(size == 0) //TODO: doubt should have a while loop here right - to avoid spurious wakeups
            {
                System.out.println("going to wait as nothing to dequeue");
                lock.wait();
            }

            if(head == capacity)
            {
                head = 0;
            }

            item = queue[head];
            queue[head] = null;
            head++;
            size--;
            lock.notifyAll();
        }
        return item;
    }

    public int getCurrentQueueItemCount(){
        synchronized (lock) {
            return this.size;
        }
    }
}
