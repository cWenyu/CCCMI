#!/bin/sh

# RELEASE KEYSTORE
echo "$RELEASE_KEYSTORE" > my-release-key.keystore.asc
gpg -d --passphrase="$RELEASE_KEYSTORE_PASSPHRASE" --batch my-release-key.keystore.asc > mobile_ui/android/app/my-release-key.keystore

# list android/app

# set android/gradle.properties
# echo "$GRADLE_PROPERTIES" >> mobile_ui/android/gradle.properties
