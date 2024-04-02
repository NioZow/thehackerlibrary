#!/bin/bash

(cd backend; go run main.go &)
(cd frontend; npm run dev)
