#!/usr/bin/env bash

for (( c=1; c<=5; c++ ))
do
  for (( d=1; d<=5; d++ ))
  do
    python simulate
  done

  sleep 1m
done