# AI Prompts

The following are useful prompts when using an AI to assist with development. Note: Written in April 2025

## Overview

AI coding assistants are most effective when they have the necessary context to perform the tasks asked of them. The process of building sufficient context follows the same patterns we see in regular software engineering work. For example, before executing on engineering tasks, teams create the following specifications from high level to low level:

* **Feature Spec**: Details on the expected behavior of the software usually expressed user story format
* **Implementation Strategy**: High level plans for executing the required engineering
* **Implementation Tasks**: A list of well defined enginering tasks based on engineering plans

Work at these levels occurs in loops with **Feature Spec** as the outer most loop represeting a single cycle of feature iteration. Within these are **Implementation Strategy** which described high level engineering execution strategy. Within the enginering strategy is a list of **Implementation Tasks** which represent the engineering tasks a software team will execute.

#### Illustration

```
+----<--------------------------------------------+
|               FEATURE SPEC LOOP                 |
|  +----<-------------------------------------+   |
|  |      IMPLEMENTATION STRATEGY LOOP        |   |
|  |  +----<------------------------------+   |   |
|  |  |     IMPLEMENTATION TASKS LOOP     |   |   |
|  |  |  +---------------------------+    |   |   |
|  |  |  |   ENGINEERING EXECUTION   |    |   |   |
|  |  |  +---------------------------+    |   |   |
|  |  |                                   |   |   |
|  |  +-----------------------------------+   |   |
|  +------------------------------------------+   |
+-------------------------------------------------+
  
  
              +-------------------------+
              |      Feature Spec       |
              |     (User Stories)      |
              +-------------------------+
                          |
                          v
              +-------------------------+
              | Implementation Strategy |
              | (High-lvl eng. strategy)|
              +-------------------------+
                          |
                          v
              +-------------------------+
              |  Implementation Tasks   |
              |  (Defined eng. tasks)   |
              +-------------------------+
                          |
                          v
              +-------------------------+      AI-assisted development
              |  Engineering Execution  |     <-------------------------
              |  (Code implementation)  |
              +-------------------------+
```

We want to apply the same mode with AI assistants. The nice thing about working with code, we can create these specs alongside our code and include reference them when making requests. 

## Specs

The following patterns assume an engineer is building a new feature and will build the specs in sequence to help establish sufficient context for the AI. 

### Feature Spec

Please create user stories for a [insert feature name] feature. The user stories should be formatted like the user stories in [core-specs.md](/specs/product/core-specs.md) . They should include the following:

[insert an outline of some user stories]

This is all the expected functionality for this iteration. We will add other operations like [insert extended features] in future iterations.

### Implementation Strategy
 
Using [adding-features.md](/docs/adding-features.md) as a guide, please create a plan to develop this feature in a new file in [/docs/plans](/docs/plans/) called feature-plan01.md. It should be formatted like [migration-plan04.md](/docs/plans/migration-plan04.md) and contain the same level of detail. We'll later use this plan to create an implementation plan with task level details for engineering.

### Implementation Tasks

Using [adding-features.md](/docs/adding-features.md) and [task-template.md](/docs/plans/task-template.md), please create implementation tasks following a test-driven development approach for feature-plan01.md in a file called implementation-tasks[insert number].md. Use [/tests/README.md](/tests/README.md) to guide your testing strategy. The maximum story point level for any task should be no greater than 5 points. You can use [implementation-tasks02.md](/docs/plans/implementation-tasks02.md) as an example. 

### Implementation

Please implement [insert task name] in /docs/plans/implementation-tasks[insert number].md. Organize all tests in /tests in the root of the app and use /tests/README.md as testing guide. Please do not stop working until all tests pass. After all tests pass, update the task's status.

----

## Development loop

At this point you should be able to iterate over all the tasks in the implementation plan, testing and merging as you go.


-----

# More Prompts

## App setup
Using @development-guide.mdand @core-specs.md, create an analysis in @app-setup.md around to set up this app to start development.

Using @app-setup.md as a guide, please create a plan in @impl-plan-app-setup.md.

Using @impl-plan01-app-setup.md and @task-template.md , please create implementation tasks in @impl-tasks01-app-setup.md . The maximum story point level for any task should be no greater than 5 points. 

## Task implementation

Please implement TEST-01 in @impl-tasks01-app-setup.md . Do not stop working until you have confirmed the Acceptance Criteria. Once confirmed, please mark the task's status as DONE.