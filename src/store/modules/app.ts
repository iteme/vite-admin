import { defineStore } from 'pinia';

interface AppState {
  lang: string;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    lang: '',
  }),
  getters: {
    getLang(): string {
      return this.lang;
    },
  },
  actions: {
    setLang(lang: string) {
      this.lang = lang;
    },
  },
});
