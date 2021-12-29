const workbox = require("workbox-build");

workbox
    .injectManifest({
        globDirectory: "./",
        globPatterns: ["home/microsite/plan/html/**/*"],
        swDest: "./sw.js",
        swSrc: "./build/sw.js",
    })
    .then(({ count, size }) => {
        console.log(
            `Generated  which will precache ${count} files, totaling ${size} bytes.`
        );
    });

// home/microsite/plan/html/**/*
