# Xtra HRMS (Client)

[![GitHub CI](https://github.com/Kelvince01/xtra-hrms-client/workflows/CI/badge.svg)](https://github.com/Kelvince01/xtra-hrms-client/actions?query=workflow%3ACI)
[![Build Status](https://travis-ci.com/Kelvince01/xtra-hrms-client.svg?branch=master)](https://travis-ci.com/Kelvince01/xtra-hrms-client)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![GitHub issues](https://img.shields.io/github/issues/Kelvince01/xtra-hrms-client)](https://github.com/Kelvince01/xtra-hrms-client/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Kelvince01/xtra-hrms-client)](https://github.com/Kelvince01/xtra-hrms-client/pulls)
[![GitHub stars](https://img.shields.io/github/stars/Kelvince01/xtra-hrms-client)](https://github.com/Kelvince01/xtra-hrms-client/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Kelvince01/xtra-hrms-client)](https://github.com/Kelvince01/xtra-hrms-client/network)
[![GitHub contributors](https://img.shields.io/github/contributors/Kelvince01/xtra-hrms-client)](https://github.com/Kelvince01/xtra-hrms-client/graphs/contributors)
[![GitHub license](https://img.shields.io/github/license/Kelvince01/xtra-hrms-client)](https://github.com/Kelvince01/xtra-hrms-client)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Kelvince01/xtra-hrms-client)
![GitHub repo size](https://img.shields.io/github/repo-size/Kelvince01/xtra-hrms-client)

The application was developed to showcase different scenarios where utilizing Directives in Angular can be advantageous. In the repository, we can compare the implementations of solutions using directives versus the standard approach.

Note: It is crucial not to consider all usages of directives as 'Best Practices'. The objective of the presentation was to motivate developers and demonstrate diverse solutions where utilizing directives could be an intriguing choice.

Note: Please note that the application utilizes two UI libraries, and the rationale behind this choice is straightforward. By incorporating these libraries, I was able to showcase a broader range of use cases and demonstrate their practical applications.

## Table of contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [What's in the box ?](#whats-in-the-box-)
  - [CircleCI](#circleci)
  - [Commitizen](#commitizen)
  - [Commitlint](#commitlint)
  - [ESLint](#eslint)
  - [GitHub Actions](#github-actions)
  - [Husky](#husky)
  - [Lint-staged](#lint-staged)
  - [Prettier](#prettier)
  - [Stylelint](#stylelint)
  - [Travis CI](#travis-ci)
- [Code scaffolding](#code-scaffolding)
- [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Further help](#further-help)
---

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them :

* [Git](https://git-scm.com/)
* [Angular CLI](https://cli.angular.io/) *installed globally recommended*

### Installation

1. Clone the git repository

   ```bash
   git clone https://github.com/smarlhens/ng8-boilerplate.git
   ```

1. Go into the project directory

   ```bash
   cd ng8-boilerplate/
   ```

1. Checkout working branch

   ```bash
   git checkout <branch>
   ```

---

## What's in the box ?

### CircleCI

[CircleCI](https://circleci.com/) automates your software builds, tests, and deployments.

**CircleCI pipeline file**: [```.circleci/config.yml```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.circleci/config.yml).

For more configuration options and details, see the [configuration docs](https://circleci.com/docs/).

---

### Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use ```git cz``` instead of ```git commit``` to use commitizen.

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

**Configuration file**: [```.czrc```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.czrc).

---

### Commitlint

[commitlint](https://github.com/conventional-changelog/commitlint) checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

**Configuration file**: [```.commitlintrc```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.commitlintrc).

In general the pattern mostly looks like this:
```sh
type(scope?): subject  #scope is optional
```
Are you a good `commitizen` ?

---

### ESLint

[ESLint](https://eslint.org/) is a fully pluggable tool for identifying and reporting on patterns in JavaScript.

**Configuration file**: [```.eslintrc```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.eslintrc).

For more configuration options and details, see the [configuration docs](https://eslint.org/docs/user-guide/configuring).

---

### GitHub Actions

[GitHub Actions](https://github.com/features/actions) makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.

**CI workflow file**: [```.github/workflows/ci.yml```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.github/workflows/ci.yml).

---

### Husky

[Husky](https://github.com/typicode/husky) is a package that helps you create Git hooks easily.

**Configuration file**: [```.huskyrc```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.huskyrc).

---

### Lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) is a Node.js script that allows you to run arbitrary scripts against currently staged files.

**Configuration file**: [```.lintstagedrc```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.lintstagedrc).

---

### Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter.

**Configuration file**: [```.prettierrc```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.prettierrc).  
**Ignore file**: [```.prettierignore```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.prettierignore).

For more configuration options and details, see the [configuration docs](https://prettier.io/docs/en/configuration.html).

---

### Stylelint

[Stylelint](https://stylelint.io/) is a mighty & modern style linter.

**Configuration file**: [```.stylelintrc```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.stylelintrc).

---

### Travis CI

[Travis CI](https://travis-ci.com/) is a hosted continuous integration service used to build and test software projects hosted at GitHub.

**Travis buildd file**: [```.travis.yml```](https://github.com/smarlhens/ng8-boilerplate/blob/master/.travis.yml).

For more configuration options and details, see the [configuration docs](https://docs.travis-ci.com/).

---
## Deploy Your Own

Deploy your own Angular project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Kelvince01/xtra-hrms-client/tree/master/)

_Live Example: https://xtra-hrms-client.vercel.app_

---

## Project folder structure

    .
    ├── enums
    ├── helpers
    ├── pages                     
    │   ├── directive-composition-api   # Use cases implemented using Directive Composition API
    │   ├── directive-solutions         # Use cases implemented using Directive solutions
    │   └── naive                       # Contains standard approach for various use cases
    ├── services                    
    ├── types                     
    └── app.component.ts

# Presentation - Angular Wrocław

It was presented by [Paweł Kubiak](https://twitter.com/pawelkubiakdev) on [Angular Wrocław Meetup](https://twitter.com/AngularWroclaw).

Link to presentation: https://docs.google.com/presentation/d/1DzGatYGiz7DA6T36QnKThWHtUwqNJ4Qr5zmvPCKpS6Q/edit?usp=sharing

# Use Cases

0. NgPlural
1. Open External Links in the new tab
2. Validate Password Strength
3. Extend 3rd Party Component - Calendar (PrimeNg)
4. Extend 3rd Party Components - Dropdown (PrimeNg)
5. User Permission
- display/hide elements
- disable elements
6. Smart Directive - Context Menu
7. Directive Composition API - Context Menu

# Resources
I would like to thank all the creators who inspired me to create this presentation.
I used the following materials to prepare the presentation:

## Attribute Directives
* [Video - Angular Directives - Build a Hold-to-Delete Button](https://www.youtube.com/watch?v=kl-UMCHpEsw) by [Fireship](https://twitter.com/fireship_dev)
* [Article - Use Angular directives to extend components that you don't own](https://timdeschryver.dev/blog/use-angular-directives-to-extend-components-that-you-dont-own) by [Tim Deschryver](https://twitter.com/tim_deschryver)
* [Article - Superpowers with Directives and Dependency Injection: Part 1](https://dev.to/this-is-angular/superpowers-with-directives-and-dependency-injection-part-1-ho7) by [Armen Vardanyan](https://twitter.com/Armandotrue)
* [Article - Superpowers with Directives and Dependency Injection: Part 3](https://dev.to/this-is-angular/superpowers-with-directives-and-dependency-injection-part-3-18ja) by [Armen Vardanyan](https://twitter.com/Armandotrue)
* [Article - Superpowers with Directives and Dependency Injection: Part 4](https://dev.to/this-is-angular/superpowers-with-directives-and-dependency-injection-part-4-2gi8) by [Armen Vardanyan](https://twitter.com/Armandotrue)

## Structural Directives
* [Video - Demystified Angular Directives](https://www.youtube.com/watch?v=bVyw2njDoZw) by [Nir Kaufman](https://twitter.com/nirkaufman)
* [Video - Structural Directives in Angular – How to Create Custom Directive](https://www.youtube.com/watch?v=07CaGlbMPbw) by [Dmytro Mezhenskyi](https://twitter.com/DecodedFrontend)
* [Video - NgTemplateOutlet in Angular - Everything You Have to Know (2022)](https://www.youtube.com/watch?v=vfPVdJ2oQlM) by [Dmytro Mezhenskyi](https://twitter.com/DecodedFrontend)
* [Article - Superpowers with Directives and Dependency Injection: Part 2](https://dev.to/this-is-angular/superpowers-with-directives-and-dependency-injection-part-2-16ea) by [Armen Vardanyan](https://twitter.com/Armandotrue)
* [Article - Create a custom Structural Directive to manage permissions](https://dev.to/this-is-angular/create-a-custom-structural-directive-to-manage-permissions-like-a-pro-5293) by [Thomas Laforge](https://twitter.com/laforge_toma)


## Directive Composition API - new feature Angular 15
* [Video - Angular Directive Composition | Kevin Kreuzer | Angular Tiny Conf Peret 2022](https://www.youtube.com/watch?v=5lYs251skTA) by [Kevin Kreuzer](https://twitter.com/kreuzercode)
* [Video - Introducing the Directive Composition API in Angular v15](https://www.youtube.com/watch?v=EJJwyyjsRGs) by [Angular](https://twitter.com/angular) - new feature Angular 15
* [Video - Directive Composition API Intro w/ Kristiyan Kostadinov](https://www.youtube.com/watch?v=oC9Qd9yw3pE) by [Kristiyan Kostadinov](https://twitter.com/_crisbeto)
* [Video - Learn What the Directive Composition API Is and How To Use It in Angular 15](https://www.youtube.com/watch?v=2S6FVt-tQ7M) by [Fanis Prodromou](https://twitter.com/prodromouf)
* [Article - Making DRY Conditional Structural Directives Using Angular Directive Composition API](https://netbasal.com/making-dry-conditional-structural-directives-using-angular-directive-composition-api-bc346672445d) by [Netanel Basal](https://twitter.com/NetanelBasal)

# Additional Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
