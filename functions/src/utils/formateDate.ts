import dayjs from 'dayjs';

interface UnixTimestamp {
    _seconds: number;
    _miliseconds: number;
}

export const formatDate = (firebaseTimestamp: UnixTimestamp): Date => dayjs.unix(firebaseTimestamp._seconds).toDate()