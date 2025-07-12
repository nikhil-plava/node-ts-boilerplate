import app from "./app";
import { env } from "./config/envConfig";
import {
  EServerStartMessages,
  EUncaughtExceptionMessages,
  EUnhandledRejectionMessages,
} from "./messages";

// Handle uncaught exceptions
process.on(EUncaughtExceptionMessages.uncaughtException, (err) => {
  console.error(
    EUncaughtExceptionMessages.uncaughtExceptionMessage,
    err.message
  );
  console.error(err.stack);
  process.exit(1);
});

const PORT = env.PORT;
const server = app.listen(PORT, () => {
  console.log(`${EServerStartMessages.serverRunning}${PORT}`);
});

// Handle unhandled promise rejections (async errors)
process.on(EUnhandledRejectionMessages.unhandledRejection, (reason: any) => {
  console.error(EUnhandledRejectionMessages.unhandledRejectionMessage, reason);
  server.close(() => {
    process.exit(1);
  });
});
