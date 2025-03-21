---
title: "Python Virtual Environments"
description: "Helping those who are new to Python navigate the world of virtual environments and package management.  I've mainly included points where I ran into trouble as I was learning."
image: "/image/python-venv-1.png"
pubDate: 2024-08-18
---

# Python Virtual Environments and Packages
This article is the first of hopefully several to help those who are new to Python navigate the world of virtual environments and package management. I’ve mainly included points where I ran into trouble as I was learning.

## What is a Virtual Environment and Why Do I Need One?
A virtual environment is a self-contained directory that contains a Python installation for a specific version of Python, along with a set of packages. It allows you to manage project-specific dependencies without affecting other projects or the global Python environment.

Packages are collections (or libraries) of pre-written code that extend the capabilities of the language, for example to simplify access to databases, or to provide functionality for technical analysis of data.

Using a virtual environment ensures that your project’s dependencies are isolated. This means that if you’re working on multiple projects, each can have its own set of package versions without conflicts. It helps prevent issues that arise from having incompatible package versions installed globally, keeping your projects easier to manage.

*Environment Tools: while there are many environment tools available, this note concentrates on venv and pip because they are some of the most basic but also some of the most widely used.*

## Creating and Activating Virtual Environments
Create virtual environments with the venv module, which is built into Python versions 3.3 and later. From the command line, change to your project directory and create a virtual environment like this:

```shell
# Create virtual environment:
python -m venv {environment name}

# By convention the environments are often named .venv or similar.
# This will create your environment:
python -m venv .venv
```

Now that the environment is created, activate the environment to use it. Process is similar but slightly different across different operating systems and shells:

## MacOS and Linux
```shell
source .venv/bin/activate
```

## Windows
```shell
# Command Prompt:
.venv/Scripts/activate

# PowerShell:
.venv/Scripts/activate.ps1
```

Regardless of the OS and shell, you should see your command prompt prefixed with your virtual environment name after activation, as shown here. After activation, any Python command you run will use the Python interpreter and packages from this environment.

## Persisting and Re-creating Environments
Once you have an environment set up, it’s common that you will want to be able to share it, or to reconstruct it at a later time. Additionally, it is strongly recommended not to commit local environment files to source control as this not only can introduce cross-platform conflicts, it greatly bloats repositories. To avoid these issues, you will want to persist your environment.

```shell
# Persist your environment to a text file, which is committed 
# to source control:
pip freeze > requirements.txt
```

f you run into an error that pip is not recognized, you may need to use pip3, similar to the python vs python3 above. Once your environment is active, pip should work as expected. To reconstruct your environment do the following after fetching source code:

```shell
# 1. Create and activate a virtual environment (follow activation 
# steps above)
python -m venv .venv

# 2. Install packages specified in the environment:
pip install -r requirements.txt
```

## Adding and Removing Packages From Environments
During development, you may need to pull in more packages, and drop some that are no longer needed. Again use `pip`:

```shell
# Add new package to environment:
pip add {package-name}

# Remove package:
pip remove {package-name}
# Update requirements.txt after making changes:
pip freeze > requirements.txt
```

## Conclusion
Learning to manage Python environments and packages can feel a bit overwhelming at first, but with practice, it becomes second nature. The key is to start small, experiment, and don’t be afraid to make mistakes. Each challenge you encounter is just another step toward mastering these tools. In future articles, we’ll explore more advanced topics, so stay tuned. Happy coding!

![Python Virtual Environments Footer Image](/image/python-venv-2.png)