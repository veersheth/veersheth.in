document.querySelector('.copy-email').addEventListener('click', function () {
  const email = this.dataset.email;
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  });
});

const projectsList = document.querySelector('.projects-list');
document.querySelector('.projects-prev').addEventListener('click', () => {
  projectsList.scrollBy({ left: -projectsList.querySelector('.project-card').offsetWidth, behavior: 'smooth' });
});
document.querySelector('.projects-next').addEventListener('click', () => {
  projectsList.scrollBy({ left: projectsList.querySelector('.project-card').offsetWidth, behavior: 'smooth' });
});

const allPills = document.querySelectorAll('.pill');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.dataset.url) window.open(card.dataset.url, '_blank');
  });

  card.addEventListener('mouseenter', () => {
    const skills = card.dataset.skills.split(',').map(s => s.trim());
    allPills.forEach(pill => {
      if (skills.includes(pill.textContent.trim())) {
        pill.classList.add('active');
        pill.classList.remove('inactive');
      } else {
        pill.classList.add('inactive');
        pill.classList.remove('active');
      }
    });
  });

  card.addEventListener('mouseleave', () => {
    allPills.forEach(pill => pill.classList.remove('active', 'inactive'));
  });
});
