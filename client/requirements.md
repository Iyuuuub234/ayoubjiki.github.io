## Packages
three | Core 3D library
@react-three/fiber | React renderer for Three.js
@react-three/drei | Useful helpers for R3F
gsap | GreenSock Animation Platform for robust scroll animations
@gsap/react | React hooks for GSAP
framer-motion | For UI entry/exit animations
maath | Math helpers for random generators in 3D

## Notes
- The site uses a "Single Page Scroll" architecture.
- 3D Canvas is fixed in the background (z-index: -1).
- GSAP ScrollTrigger controls the camera movement and HTML element reveals.
- API endpoint /api/contact is used for the contact form.
- Images expected at /images/profile-pic.png and /images/profile-pic-2.png (dynamic/user-provided).
