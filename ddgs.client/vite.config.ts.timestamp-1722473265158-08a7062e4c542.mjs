// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/PetProjects/DDGS/ddgs.client/node_modules/vite/dist/node/index.js";
import fs from "fs";
import path from "path";
import svgr from "file:///D:/PetProjects/DDGS/ddgs.client/node_modules/vite-plugin-svgr/dist/index.js";
import dts from "file:///D:/PetProjects/DDGS/ddgs.client/node_modules/vite-plugin-dts/dist/index.mjs";
import react from "file:///D:/PetProjects/DDGS/ddgs.client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\PetProjects\\DDGS\\ddgs.client";
var __vite_injected_original_import_meta_url = "file:///D:/PetProjects/DDGS/ddgs.client/vite.config.ts";
var baseConfig = {
  build: {
    outDir: "build"
  },
  plugins: [svgr(), dts(), react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
};
var vite_config_default = defineConfig(() => {
  if (process.env.VITE_PROTOCOL === "https") {
    return {
      ...baseConfig,
      server: {
        watch: {
          usePolling: true
        },
        host: true,
        strictPort: true,
        port: +process.env.VITE_PORT,
        https: {
          pfx: fs.readFileSync(path.resolve(__vite_injected_original_dirname, "https/ddgs.client.pfx")),
          passphrase: process.env.VITE_SSL_CERTIFICATE_CRYPTIC_PASSWORD
        }
      }
    };
  } else {
    return {
      ...baseConfig,
      server: {
        watch: {
          usePolling: true
        },
        host: true,
        strictPort: true,
        port: +process.env.VITE_PORT
      }
    };
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQZXRQcm9qZWN0c1xcXFxEREdTXFxcXGRkZ3MuY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQZXRQcm9qZWN0c1xcXFxEREdTXFxcXGRkZ3MuY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9QZXRQcm9qZWN0cy9EREdTL2RkZ3MuY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmNvbnN0IGJhc2VDb25maWcgPSB7XG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnYnVpbGQnXG4gIH0sXG4gIHBsdWdpbnM6IFtzdmdyKCksIGR0cygpLCByZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52LlZJVEVfUFJPVE9DT0wgPT09ICdodHRwcycpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uYmFzZUNvbmZpZyxcbiAgICAgIHNlcnZlcjoge1xuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgIHVzZVBvbGxpbmc6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICAgICAgcG9ydDogK3Byb2Nlc3MuZW52LlZJVEVfUE9SVCxcbiAgICAgICAgaHR0cHM6IHtcbiAgICAgICAgICBwZng6IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnaHR0cHMvZGRncy5jbGllbnQucGZ4JykpLFxuICAgICAgICAgIHBhc3NwaHJhc2U6IHByb2Nlc3MuZW52LlZJVEVfU1NMX0NFUlRJRklDQVRFX0NSWVBUSUNfUEFTU1dPUkRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmJhc2VDb25maWcsXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICB1c2VQb2xsaW5nOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGhvc3Q6IHRydWUsXG4gICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgICAgIHBvcnQ6ICtwcm9jZXNzLmVudi5WSVRFX1BPUlRcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVIsU0FBUyxlQUFlLFdBQVc7QUFDMVQsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBTmxCLElBQU0sbUNBQW1DO0FBQW9JLElBQU0sMkNBQTJDO0FBUTlOLElBQU0sYUFBYTtBQUFBLEVBQ2pCLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUM7QUFBQSxFQUNoQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFDaEMsTUFBSSxRQUFRLElBQUksa0JBQWtCLFNBQVM7QUFDekMsV0FBTztBQUFBLE1BQ0wsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxRQUNBLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLE1BQU0sQ0FBQyxRQUFRLElBQUk7QUFBQSxRQUNuQixPQUFPO0FBQUEsVUFDTCxLQUFLLEdBQUcsYUFBYSxLQUFLLFFBQVEsa0NBQVcsdUJBQXVCLENBQUM7QUFBQSxVQUNyRSxZQUFZLFFBQVEsSUFBSTtBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTCxZQUFZO0FBQUEsUUFDZDtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osTUFBTSxDQUFDLFFBQVEsSUFBSTtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
