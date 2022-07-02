#!/bin/bash
${KERNEL:="/data/qemu/raspian-kernel.qemu"}
image="$1"
qemu-system arm -kernel "$KERNEL" -cpu arm1176 -m 256 \
	-M versatilepb -no-reboot -daemonize \
	-append "root=/dev/sda2 panic=1 rootfstype=ext4 rw" \
	-hda "$image"
