#!/bin/sh

# RELEASE KEYSTORE

echo "$RELEASE_KEYSTORE" > my-release-key.keystore.asc
echo $RELEASE_KEYSTORE | tr ' $' '\n' > my-release-key.keystore.asc

echo $BASE64 | tr ' ' '\n' > my-release-key.keystore.b64
base64 -d my-release-key.keystore.b64 > my-release-key.keystore


gpg -d --passphrase="$RELEASE_KEYSTORE_PASSPHRASE" --batch my-release-key.keystore.asc > mobile_ui/android/app/my-release-key.keystore

gpg -d --passphrase $RELEASE_KEYSTORE_PASSPHRASE --batch my-release-key.keystore.asc > my-release-key.keystore

gpg --batch --passphrase $RELEASE_KEYSTORE_PASSPHRASE -d -o my-release-key.keystore my-release-key.keystore.asc


# set android/gradle.properties



