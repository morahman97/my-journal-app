// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveTextFile: (filename: string, content: string) => ipcRenderer.send("save-text-file", filename, content),
  saveJSONFile: (content: any) => ipcRenderer.send("save-json-file", content),
});
