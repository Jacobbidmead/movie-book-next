MediaBook AI

As yet, the app is still in beta.

Overview -


MediaBook AI is designed to solve the indecisiveness often faced when choosing movies. Built with TypeScript and Next.js, it provides a robust, user-friendly interface powered by the App Router and styled using Tailwind CSS. The app integrates data from The Movie Database (TMDb) API, it allows users to search for  movies and shows and add them to a list. The users can then use the integrated AI to get recommendations based on thier saved choices.

Key Features

Personalised Movie Search: Users can search for and add their favorite movies & shows to a list, using data sourced from TMDb API.

AI-Powered Movie Matching: Utilising AI, the app finds recommnedations based on what the user has saved. In the future, the app will compare user profiles with those of a friend or partner to suggest movies that suit both parties' preferences.

Mood-Based Suggestions: The app will take into account the current mood of users, offering movie recommendations that align with how they're feeling.

Technologies Used

TypeScript: Ensures type safety and enhances the development experience with static type checking. Next.js: Provides a framework for server-side rendering, improving SEO and performance. App Router: Manages routing in the Next.js environment, offering a seamless navigation experience. Tailwind CSS: Utilized for styling, offering a utility-first approach for a customizable and responsive design.


How the AI Works

OpenAI Api is integrated into the project using OpenAI API. The AI takes in the list of media that the user has saved, and is also given a prompt detailing the response to give the user. This response is in JSON format.


Future Enhancements 

The AI algorithm will compare the movie preferences and watch histories of two users to find commonalities and differences. It then analyses mood inputs to filter suggestions, ensuring the recommended movies align with both users' tastes and current emotional state.

Broader API Integration: Plans to incorporate more streaming service APIs for a wider range of movie options. Advanced AI Features: Enhancing the AI to consider more nuanced user preferences and viewing habits.
