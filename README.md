The above link is the repository for the API used in UrbanPact home screen. It uses standard web technologies which are HTML5 for structure, CSS3 for styling and JavaScript for interactive logic. This approach ensures the application is lightweight and responsive across mobile devices. The real time latest post uses NewsData.io API to retrieve the latest news and posts from different sources.

The community highlight uses third-party multimedia integration through the Youtube IFrame API. By adding this video player directly into the interface, the application is able to provide high-quality video streaming without lagging the local server with large video files.

To improve accessibility for the visually impaired, UrbanPact is built in with a Web Speech API which is a text-to -speech functionality. When a user taps on the audio button, the JavaScript logic will read the associated text and use the browser’s technology to read it aloud.

Finally, in order to have all the API working seamlessly, the application uses a local HTTP server environment such as a Live Server to retrieve API requests.
