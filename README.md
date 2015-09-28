Singapore Savingasa
==================

##  How to join the project

Install ruby (check version in Gemfile)

  ```
  $ rvm get stable && rvm install ...
  ```

Clone the repo

  ```
  $ git clone git@github.com:Ragnarson/singapore_savingasia.git
  ```

Setup deis platform

  ```
  $ brew install deis
  ```

## How to run locally

Install gems

  ```
  $ bundle install
  ```

Check if all tests pass

  ```
  $ bundle exec rspec
 ```

Run
  ```
  $ bundle exec rackup
  ```

 or install [Shotgun](https://github.com/rtomayko/shotgun) and then run

  ```
  $ shotgun config.ru
  ```

## How to contribute new code/changes/fixes

1. Develop on own branch, based on master
2. When finished make a pull request with it.
3. Ask another dev (project leader) for opinion.
4. Merge PR to master locally and then push to master.
