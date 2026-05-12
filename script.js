const hiddenFlag = "KMUTT{reverse_engineering}";

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-btn');
    const targetText = document.getElementById('target-text');
    const targetLabel = document.getElementById('target-label');
    const hintText = document.getElementById('hint-text');
    const actionBtn = document.getElementById('action-btn');

    const submitBtn = document.getElementById('submit-btn');
    const flagInput = document.getElementById('flag-input');

    const modalOverlay = document.getElementById('modal-overlay');
    const modal = modalOverlay.querySelector('.modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Challenge Data for different systems
    const challengeData = {
        "Cryptography": {
            targetLabel: "Encrypted Flag",
            targetText: "S01VVFR7Q1lCRVJ9",
            hint: "This message was encoded using Base64. Use the 'From Base64' operation in CyberChef.",
            btnText: "Open CyberChef",
            btnLink: "https://toolbox.itsec.tamu.edu/",
            flag: "KMUTT{CYBER}"
        },
        "OSINT": {
            targetLabel: "The man who found in facebook.",
            targetText: "https://www.facebook.com/photo?fbid=1173997489463706&set=a.102729663257166",
            hint: "When you click the link will find the flag.",
            btnText: "Open Facebook",
            btnLink: "https://www.facebook.com/photo?fbid=1173997489463706&set=a.102729663257166",
            flag: "KMUTT{hidden_flag_in_facebook}"
        },
        "Digital Forensics": {
            hint: "This file have a secret flag use the metadata2go, you will find flag.",
            btnText: "Download File",
            btnLink: "695565046_10239879968718184_8794800284229160206_n (1).jpg",
            isDownload: true,
            flag: "KMUTT{wow_you_can_do_it}"
        },
        "Reverse Engineering": {
            hint: "This web has flag that hidden. Click 'Inspect' and view the script.js you will find the flag.",
            flag: "KMUTT{reverse_engineering}"
        }
    };

    let currentSystem = "Cryptography";

    // Copy Button Functionality
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(targetText.innerText);

            // Change state to copied
            copyBtn.innerText = 'Copied';
            copyBtn.classList.remove('btn-secondary');
            copyBtn.classList.add('success');

            // Revert back after 2 seconds
            setTimeout(() => {
                copyBtn.innerText = 'Copy';
                copyBtn.classList.remove('success');
                copyBtn.classList.add('btn-secondary');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    // Submit Functionality
    const checkFlag = () => {
        const userInput = flagInput.value.trim();
        if (!userInput) return;

        const correctFlag = challengeData[currentSystem].flag;

        if (userInput === correctFlag) {
            showModal(
                'success',
                '✓',
                'Success!',
                'You have successfully decoded the flag. Great job!'
            );
        } else {
            showModal(
                'error',
                '✕',
                'Incorrect',
                'That is not the correct flag. Try again!'
            );
        }
    };

    submitBtn.addEventListener('click', checkFlag);

    // Allow Enter key to submit
    flagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkFlag();
        }
    });

    // Modal Functionality
    const showModal = (type, icon, title, message) => {
        modal.className = 'modal ' + type;
        modalIcon.innerText = icon;
        modalTitle.innerText = title;
        modalMessage.innerText = message;

        modalOverlay.classList.add('active');
    };

    const hideModal = () => {
        modalOverlay.classList.remove('active');
    };

    closeModalBtn.addEventListener('click', hideModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    // Nav links functionality
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const heroTitle = document.querySelector('.hero h1');

    navLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all
            navLinks.forEach(i => i.classList.remove('active'));
            // Add active class to clicked
            item.classList.add('active');

            const selectedSystem = item.getAttribute('data-system') || item.innerText;
            currentSystem = selectedSystem;

            // Update hero title
            heroTitle.innerText = `${selectedSystem} Challenge`;

            // Update challenge content
            const data = challengeData[selectedSystem];

            const targetSection = document.getElementById('target-section');

            // Handle Target Label & Text Container
            if (!data.targetLabel && !data.targetText) {
                if (targetSection) targetSection.style.display = 'none';
            } else {
                if (targetSection) targetSection.style.display = 'block';

                if (data.targetLabel) {
                    targetLabel.style.display = 'block';
                    targetLabel.innerText = data.targetLabel;
                } else {
                    targetLabel.style.display = 'none';
                }

                if (data.targetText) {
                    targetText.parentElement.style.display = 'flex';
                    targetText.innerText = data.targetText;
                } else {
                    targetText.parentElement.style.display = 'none';
                }
            }

            // Handle Hint
            if (data.hint) {
                hintText.style.display = 'block';
                hintText.innerText = data.hint;
            } else {
                hintText.style.display = 'none';
            }

            // Handle Action Button
            if (data.btnText && data.btnLink) {
                actionBtn.style.display = 'inline-block';
                actionBtn.innerText = data.btnText;
                actionBtn.href = data.btnLink;

                if (data.isDownload) {
                    actionBtn.setAttribute('download', data.btnLink);
                } else {
                    actionBtn.removeAttribute('download');
                }
            } else {
                actionBtn.style.display = 'none';
            }

            // Clear input
            flagInput.value = '';
        });
    });
});
