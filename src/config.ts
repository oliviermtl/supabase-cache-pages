export const config: Config = {
  appName: "My App",
  appDescription: "A simple app",
};

interface Config {
  appName: string;
  appDescription?: string;
}
