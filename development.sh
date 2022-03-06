#!/bin/bash

# 開発環境用に Volume Mount したときのホストとコンテナの権限問題の解消用シェルスクリプト
# @See https://qiita.com/yohm/items/047b2e68d008ebb0f001

USER_ID=${LOCAL_UID:-9001}
GROUP_ID=${LOCAL_GID:-9001}

echo "Starting with UID : $USER_ID, GID: $GROUP_ID"
usermod -u $USER_ID -o node
groupmod -g $GROUP_ID -o node

exec /usr/sbin/gosu node "$@"
