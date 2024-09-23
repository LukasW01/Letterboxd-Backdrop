import { tryCatch } from '../src/util/throw';

describe('tryCatch', () => {
    it('should return result when promise resolves', async () => {
        const promise = Promise.resolve('success');
        const [error, result] = await tryCatch(promise);
        expect(error).toBeNull();
        expect(result).toBe('success');
    });

    it('should return error when promise rejects', async () => {
        const promise = Promise.reject(new Error('failure'));
        const [error, result] = await tryCatch(promise);
        expect(error).toEqual(new Error('failure'));
        expect(result).toBeNull();
    });

    it('should handle non-error rejects', async () => {
        const promise = Promise.reject('failure');
        const [error, result] = await tryCatch(promise);
        expect(error).toEqual('failure');
        expect(result).toBeNull();
    });

    it('should work with different types of resolved values', async () => {
        const promise = Promise.resolve(42);
        const [error, result] = await tryCatch(promise);
        expect(error).toBeNull();
        expect(result).toBe(42);
    });

    it('should work with different error types', async () => {
        type CustomError = { message: string; code: number };
        const errorObj = { message: 'Custom error', code: 123 };
        const promise = Promise.reject(errorObj);
        const [error, result] = await tryCatch<unknown, CustomError>(promise);
        expect(error).toEqual(errorObj);
        expect(result).toBeNull();
    });
});
