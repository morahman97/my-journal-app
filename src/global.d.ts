export {};

declare global {
  interface Window {
    electronAPI: {
      saveTextFile: (filename: string, content: string) => void;
      saveJSONFile: (content) => void;
    };
  }
}
