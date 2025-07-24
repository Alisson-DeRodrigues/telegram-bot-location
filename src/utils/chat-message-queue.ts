const queues: Record<number, (() => void)[]> = {};

const enqueue = async (chatId: number, job: (done: () => void) => void) => {
    if (!queues[chatId]) queues[chatId] = [];

    const wrappedJob = () => job(() => {
        queues[chatId].shift();
        if (queues[chatId].length > 0) {
            queues[chatId][0]();
        }
    });

    queues[chatId].push(wrappedJob);

    if (queues[chatId].length === 1) {
        wrappedJob();
    }
}

export default enqueue;