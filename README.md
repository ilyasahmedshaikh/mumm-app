# Mumm
Mumm App

# Serve ng App on port
ng serve --host 0.0.0.0 --disable-host-check

# Reactive Forms
https://www.digitalocean.com/community/tutorials/angular-reactive-forms-introduction

# Implementing global loader Interceptor for Http Calls
https://gist.github.com/578b047ca6734dfcf9c63ce5f92bf7ae

# Http Token Interceptor angular
https://gist.github.com/muhammadawaisshaikh/40dff47dd24ed87772b2c0daad57b634


# AngularFire
https://github.com/angular/angularfire
https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md

# firebase REST Api setup
https://documenter.getpostman.com/view/5843861/T1DmCe1D#231abe0c-61a9-4fba-94a9-355765dfa730

# AngularFire Collections
https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md

# Angular Firestore CRUD
https://blog.logrocket.com/creating-a-crud-firebase-documents-in-angular/

# Angular Firestore Collection Querying
https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md

# Angular Fire Storage - Image Upload
https://github.com/angular/angularfire/blob/master/docs/storage/storage.md

# Angular Firestore Auth
https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
https://medium.com/javascript-in-plain-english/how-to-add-firebase-authentication-to-pwa-or-angular-project-using-angularfire-83a8f61d367c

# github pages - live deploy
https://medium.com/tech-insights/how-to-deploy-angular-apps-to-github-pages-gh-pages-896c4e10f9b4

# Angular/Fire Push PWA
https://medium.com/mighty-ghost-hack/angular-8-firebase-cloud-messaging-push-notifications-cc80d9b36f82

# Get updated work from orignal to forked repo:

## set Upstream with Parent:
git remote add upstream https://github.com/ilyasahmedshaikh/mumm-app.git

## Fetch Forked Repo
git fetch upstream

## Rebase your repo/branch with parent one
git rebase upstream/main

## push the updated got changes with your repo/branch
git push origin main

# gh-pages (Build)
https://www.geeksforgeeks.org/deployment-of-angular-application-using-github-pages/

## 1. Production Build the Application using:
> ng build --prod --base-href "https://ilyasahmedshaikh.github.io/mumm-app/"

## 2. create the gh-pages branch, also upload the build and bundled code to this branch using :
> ngh --dir dist/Mumm