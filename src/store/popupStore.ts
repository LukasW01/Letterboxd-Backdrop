import { tryCatch } from '../util/throw';
import { img } from '../util/validation';
import polyfill, { Tabs } from "webextension-polyfill";
import { create } from 'zustand';

interface Error {
    text: string;
    bool: boolean;
}

interface PopupStore {
    image: string;
    error: Error;
    setImage: (image: string) => void;
    setError: (error: Error) => void;
    loadValue: () => Promise<void>;
    setValue: () => Promise<void>;
    removeValue: () => Promise<void>;
}

const usePopupStore = create<PopupStore>((set, get) => ({
    image: '',
    error: { text: '', bool: false },

    setImage: (image: string) => set(() => ({ image })),
    setError: (error: Error) => set(() => ({ error })),

    loadValue: async (): Promise<void> => {
        const [error, result] = await tryCatch(polyfill.storage.local.get('image')) as [Error, Record<string, string> | null];
        if (error) {
            console.error(error);
            return;
        }

        if (result?.image) {
            set({ image: result.image });
        }
    },

    setValue: async (): Promise<void> => {
        if (!img.isValidSync(get())) {
            set({ error: { text: 'Invalid URL or image.', bool: true } });
            return;
        }
        
        const [error] = await tryCatch(polyfill.storage.local.set({ image: get().image }));
        if (!error) {
            set({ error: { text: 'Image saved.', bool: false } });
            set({ image: get().image });            
        } else {
            console.error(error);
            return;
        }

        polyfill.tabs.query({ active: true, currentWindow: true }).then((tabs: Tabs.Tab[]): void => {
            if (tabs[0].url && /^https?:\/\/letterboxd\.com\//.test(tabs[0].url)) {
                polyfill.tabs.reload(tabs[0].id);
            }
        });
    },

    removeValue: async (): Promise<void> => {
        if (get().image) {
            const [error] = await tryCatch(polyfill.storage.local.remove('image'));
            if (!error) {
                set({ error: { text: 'Image removed.', bool: false } });
                set({ image: '' });
            } else {
                console.error(error);
                return;
            }

            polyfill.tabs.query({ active: true, currentWindow: true }).then((tabs: Tabs.Tab[]): void => {
                if (tabs[0].url && /^https?:\/\/letterboxd\.com\//.test(tabs[0].url)) {
                    polyfill.tabs.reload(tabs[0].id);
                }
            });
        }
    }
}));

export default usePopupStore;
