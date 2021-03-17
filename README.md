# Mumm
Mumm App

# Serve ng App on port
ng serve --host 0.0.0.0 --disable-host-check

# gh-pages
https://www.geeksforgeeks.org/deployment-of-angular-application-using-github-pages/

## 1. Production Build the Application using:
> ng build --prod --base-href "https://ilyasahmedshaikh.github.io/mumm-app/"

## 2. create the gh-pages branch, also upload the build and bundled code to this branch using :
> ngh --dir dist/angular-app
