// vite.config.ts
import { defineConfig } from "file:///c:/Users/Brahim%20Mohammed%20Belk/Downloads/GymFlow%20(6)/node_modules/vite/dist/node/index.js";
import react from "file:///c:/Users/Brahim%20Mohammed%20Belk/Downloads/GymFlow%20(6)/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "srcbook-error-reporter",
      // ref: https://vite.dev/guide/api-plugin.html#transformindexhtml
      transformIndexHtml(html) {
        if (process.env.NODE_ENV !== "development") {
          return html;
        }
        return [{
          tag: "script",
          attrs: { type: "module" },
          injectTo: "head",
          children: `
            // Report any logs, errors, etc to the parent srcbook app context to include in
            // the bottom panel.
            for (const method of ['log', 'debug', 'info', 'error', 'warn']) {
              const originalFn = console[method];
              console[method] = function(...args) {
                window.parent.postMessage({ type: 'console', method, args: args.map(a => \`\${a}\`) }, '*');
                return originalFn(...args);
              };
            }

            // Report any thrown errors / promise rejections so they show up in the logs
            window.addEventListener('error', (e) => {
              if (window.parent) {
                window.parent.postMessage({ type: 'error', stack: e.error.stack }, '*');
              }
            });
            window.addEventListener('unhandledrejection', (e) => {
              if (window.parent) {
                window.parent.postMessage({ type: 'unhandledrejection', reason: e.reason }, '*');
              }
            });
          `
        }];
      },
      transform(src, id) {
        if (id === "/app/src/main.tsx") {
          return `
            ${src}
            if (process.env.NODE_ENV === 'development') {
              // Report any vite-hmr errors up to the parent srcbook app context
              // Full event list: https://vite.dev/guide/api-hmr.html
              if (import.meta.hot) {
                import.meta.hot.on('vite:error', (data) => {
                  if (window.parent) {
                    window.parent.postMessage({ type: 'vite:hmr:error', data }, '*');
                  }
                });
                import.meta.hot.on('vite:beforeUpdate', (data) => {
                  if (window.parent) {
                    window.parent.postMessage({ type: 'vite:hmr:beforeUpdate', data }, '*');
                  }
                });
                import.meta.hot.on('vite:afterUpdate', (data) => {
                  if (window.parent) {
                    window.parent.postMessage({ type: 'vite:hmr:afterUpdate', data }, '*');
                  }
                });
              }
            }
          `;
        }
      }
    }
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxCcmFoaW0gTW9oYW1tZWQgQmVsa1xcXFxEb3dubG9hZHNcXFxcR3ltRmxvdyAoNilcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcImM6XFxcXFVzZXJzXFxcXEJyYWhpbSBNb2hhbW1lZCBCZWxrXFxcXERvd25sb2Fkc1xcXFxHeW1GbG93ICg2KVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYzovVXNlcnMvQnJhaGltJTIwTW9oYW1tZWQlMjBCZWxrL0Rvd25sb2Fkcy9HeW1GbG93JTIwKDYpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAge1xuICAgICAgbmFtZTogJ3NyY2Jvb2stZXJyb3ItcmVwb3J0ZXInLFxuXG4gICAgICAvLyByZWY6IGh0dHBzOi8vdml0ZS5kZXYvZ3VpZGUvYXBpLXBsdWdpbi5odG1sI3RyYW5zZm9ybWluZGV4aHRtbFxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICB0YWc6ICdzY3JpcHQnLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnIH0sXG4gICAgICAgICAgaW5qZWN0VG86ICdoZWFkJyxcbiAgICAgICAgICBjaGlsZHJlbjogYFxuICAgICAgICAgICAgLy8gUmVwb3J0IGFueSBsb2dzLCBlcnJvcnMsIGV0YyB0byB0aGUgcGFyZW50IHNyY2Jvb2sgYXBwIGNvbnRleHQgdG8gaW5jbHVkZSBpblxuICAgICAgICAgICAgLy8gdGhlIGJvdHRvbSBwYW5lbC5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbWV0aG9kIG9mIFsnbG9nJywgJ2RlYnVnJywgJ2luZm8nLCAnZXJyb3InLCAnd2FybiddKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsRm4gPSBjb25zb2xlW21ldGhvZF07XG4gICAgICAgICAgICAgIGNvbnNvbGVbbWV0aG9kXSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHsgdHlwZTogJ2NvbnNvbGUnLCBtZXRob2QsIGFyZ3M6IGFyZ3MubWFwKGEgPT4gXFxgXFwke2F9XFxgKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEZuKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXBvcnQgYW55IHRocm93biBlcnJvcnMgLyBwcm9taXNlIHJlamVjdGlvbnMgc28gdGhleSBzaG93IHVwIGluIHRoZSBsb2dzXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAod2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZXJyb3InLCBzdGFjazogZS5lcnJvci5zdGFjayB9LCAnKicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAod2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoeyB0eXBlOiAndW5oYW5kbGVkcmVqZWN0aW9uJywgcmVhc29uOiBlLnJlYXNvbiB9LCAnKicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBgLFxuICAgICAgICB9XTtcbiAgICAgIH0sXG4gICAgICBcbiAgICAgIHRyYW5zZm9ybShzcmM6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgICBpZiAoaWQgPT09ICcvYXBwL3NyYy9tYWluLnRzeCcpIHtcbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgJHtzcmN9XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgICAgLy8gUmVwb3J0IGFueSB2aXRlLWhtciBlcnJvcnMgdXAgdG8gdGhlIHBhcmVudCBzcmNib29rIGFwcCBjb250ZXh0XG4gICAgICAgICAgICAgIC8vIEZ1bGwgZXZlbnQgbGlzdDogaHR0cHM6Ly92aXRlLmRldi9ndWlkZS9hcGktaG1yLmh0bWxcbiAgICAgICAgICAgICAgaWYgKGltcG9ydC5tZXRhLmhvdCkge1xuICAgICAgICAgICAgICAgIGltcG9ydC5tZXRhLmhvdC5vbigndml0ZTplcnJvcicsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAod2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHsgdHlwZTogJ3ZpdGU6aG1yOmVycm9yJywgZGF0YSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGltcG9ydC5tZXRhLmhvdC5vbigndml0ZTpiZWZvcmVVcGRhdGUnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7IHR5cGU6ICd2aXRlOmhtcjpiZWZvcmVVcGRhdGUnLCBkYXRhIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW1wb3J0Lm1ldGEuaG90Lm9uKCd2aXRlOmFmdGVyVXBkYXRlJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoeyB0eXBlOiAndml0ZTpobXI6YWZ0ZXJVcGRhdGUnLCBkYXRhIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVixTQUFTLG9CQUFvQjtBQUN4WCxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxNQUNFLE1BQU07QUFBQTtBQUFBLE1BR04sbUJBQW1CLE1BQU07QUFDdkIsWUFBSSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzFDLGlCQUFPO0FBQUEsUUFDVDtBQUVBLGVBQU8sQ0FBQztBQUFBLFVBQ04sS0FBSztBQUFBLFVBQ0wsT0FBTyxFQUFFLE1BQU0sU0FBUztBQUFBLFVBQ3hCLFVBQVU7QUFBQSxVQUNWLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBdUJaLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFFQSxVQUFVLEtBQWEsSUFBWTtBQUNqQyxZQUFJLE9BQU8scUJBQXFCO0FBQzlCLGlCQUFPO0FBQUEsY0FDSCxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQXVCVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
