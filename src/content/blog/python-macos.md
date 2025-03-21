---
title: "Installing Python on MacOS 12.3+"
description: "Simplifying setup to get you up and running quickly."
image: "/image/python-macos-1.png"
pubDate: 2024-08-22
---

# Installing Python on MacOS 12.3+
Installing and managing Python on your Mac is much simpler now that MacOS 12.3 and later no longer include a system version of Python. Previously the systems shipped with 2.7. Attempting to replace this version could cause numerous conflicts and clutter the system. Current versions of MacOS no longer include Python, which means there is no system Python to cause conflicts.

Many guides recommended using a version manager such as pyenv or Rye to manage the multiple versions and reduce issues. While these solutions are robust, they are more complicated than needed if you just want to develop on a current version of Python. Do look at these solutions if you are interested in maintaining and using multiple specific Python versions. This guide assumes you just want to get going now.

It also takes the opinionated step of preferring to just type python instead of python3 or the even clunkier python3.12. If you prefer referencing by specific version every time, skip the final two steps.

## Install Steps
1. Open terminal (in taskbar or Command-Space for Spotlight search)
2. Attempt to run `python3` which should prompt you to install XCode command line tools (CLT)
3. Install the tools when prompted
4. Download and install Python from https://python.org/ (here we assume python3.12)
5. Verify your install is available with `python3.12 --version`
6. Find install location with `which python3.12`
7. Create symbolic link to this location:
   `sudo ln -s /path/to/python3.12 /usr/local/bin/python`
8. Verify that `python --version` now displays the version you expect (e.g. 3.12)

*Note: version 3.12 is assumed here, but substitute your version if you are installing something else.*

Now you can use the `python` command to refer to your new version. You probably no longer need the version provided with XCode, but you don’t need to remove it right away either. This method prevents any potential issues with development tools that may rely on the provided version.

## Conclusion
You should now have a simple and clean method of running Python in your desired version, which opens the door to a world of development tools and packages. pip is updated, and venv will be available for virtual environment management. See this article on Python Virtual Environments & Packages when you are ready for the next steps.

