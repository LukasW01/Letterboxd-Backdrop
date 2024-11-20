import usePopupStore from '../src/store/popupStore';
import polyfill from 'webextension-polyfill';

jest.mock('webextension-polyfill', () => ({
    storage: {
        local: {
            get: jest.fn(),
            set: jest.fn(),
            remove: jest.fn()
        }
    },
    tabs: {
        query: jest.fn().mockResolvedValue([{url: 'https://letterboxd.com/test', id: 1}]),
        reload: jest.fn()
    }
}));

describe('PopupStore', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        usePopupStore.getState().setImage('');
        usePopupStore.getState().setError({ text: '', bool: false });
    });

    describe('loadValue', () => {
        it('should load image from storage', async () => {
            (polyfill.storage.local.get as jest.Mock).mockResolvedValue({ image: 'https://test.ltrbxd.com/test.jpg' });
            await usePopupStore.getState().loadValue();
            expect(usePopupStore.getState().image).toBe('https://test.ltrbxd.com/test.jpg');
        });

        it('should handle storage errors', async () => {
            const consoleError = jest.spyOn(console, 'error').mockImplementation();
            (polyfill.storage.local.get as jest.Mock).mockRejectedValue(new Error('Storage error'));
            await usePopupStore.getState().loadValue();
            expect(consoleError).toHaveBeenCalled();
            consoleError.mockRestore();
        });
    });

    describe('setValue', () => {
        it('should validate and save valid image URL', async () => {
            usePopupStore.getState().setImage('https://test.ltrbxd.com/test.jpg');
            await usePopupStore.getState().setValue();
            expect(polyfill.storage.local.set).toHaveBeenCalledWith({ 
                image: 'https://test.ltrbxd.com/test.jpg' 
            });
            expect(usePopupStore.getState().error).toEqual({ 
                text: 'Image saved.', 
                bool: false 
            });
        });

        it('should reject invalid image URL', async () => {
            usePopupStore.getState().setImage('invalid-url');
            await usePopupStore.getState().setValue();
            expect(polyfill.storage.local.set).not.toHaveBeenCalled();
            expect(usePopupStore.getState().error).toEqual({ 
                text: 'Invalid URL or image.', 
                bool: true 
            });
        });
    });

    describe('removeValue', () => {
        it('should remove image from storage', async () => {
            usePopupStore.getState().setImage('https://test.ltrbxd.com/test.jpg');
            await usePopupStore.getState().removeValue();
            expect(polyfill.storage.local.remove).toHaveBeenCalledWith('image');
            expect(usePopupStore.getState().image).toBe('');
            expect(usePopupStore.getState().error).toEqual({ 
                text: 'Image removed.', 
                bool: false 
            });
        });

        it('should not attempt removal if no image exists', async () => {
            await usePopupStore.getState().removeValue();
            expect(polyfill.storage.local.remove).not.toHaveBeenCalled();
        });
    });
});