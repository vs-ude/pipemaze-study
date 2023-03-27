# Pipe Maze Study
This tool was developed for the Paper _Revising Poor Man's Eye Tracker for Crowd-Sourced Studies_ by the [Distributed Systems Group](https://vs.uni-due.de/) of University Duisburg-Essen.

Using this code, an online-based crowd sourced study was carried out in which test persons had to solve different mazes.
Their results and mouse movements were recorded and can be visualised using our [Visualizer Tool](https://github.com/vs-ude/pipemaze-visualizer).

## Setup
We are using a Javascript Frontend (with the help of Bootstrap) and a backend coded in Go.<br>
The project also contains a Dockerfile which is used to run our tool with Docker.

To be able to save the recorded mouse data points, you need to enter a path to where they should be saved.<br>
This is done in _docker-compose.yml_ at line 7.

Given the following folder structure (see below), you can save the recordings to the _out_ folder by changing the line to `- "./out:/app/out"`

```
pipemaze-study
|- client
|- out
|- server
```

## Usage
To start and access the website, you need to compile the project and start a docker container.<br>
From the project folder, run `docker-compose -f docker-compose.yml up --build`.<br>
It might be necessary to further append `--force-recreate` and/or disable caching in your browser, so code changes are applied correctly.

After starting the docker container, the site is available at `localhost:3366`.

## Contact
If you have any questions, suggestions or just want to get in touch, please contact
* Eileen Becks (eileen.becks@uni-due.de)
* Malte Josten (malte.josten@uni-due.de)

or visit our chair's website at https://vs.uni-due.de/.
