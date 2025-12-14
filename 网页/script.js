// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 1. 暗黑模式切换
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // 检查本地存储的主题偏好
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // 更新图标和本地存储
    if (body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });

  // 2. 移动端菜单切换
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    // 切换菜单图标
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // 3. 导航链接激活状态
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // 4. 博客分类筛选
  const categoryBtns = document.querySelectorAll('.category-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 移除所有激活状态
      categoryBtns.forEach(b => b.classList.remove('active'));
      // 添加当前激活状态
      this.classList.add('active');
      
      const filter = this.getAttribute('data-category');
      
      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          // 添加淡入动画
          setTimeout(() => {
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. 返回顶部按钮
  const backToTop = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 6. 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 关闭移动端菜单
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        // 平滑滚动到目标位置
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. 加载更多按钮动画
  const loadMoreBtn = document.querySelector('.load-more .btn');
  
  loadMoreBtn.addEventListener('click', function() {
    const spinner = this.querySelector('i');
    spinner.classList.add('fa-spin');
    
    // 模拟加载延迟
    setTimeout(() => {
      spinner.classList.remove('fa-spin');
      alert('已加载全部博客内容！');
    }, 1500);
  });

  // 8. 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
      navbar.style.padding = '10px 0';
      navbar.style.boxShadow = '0 6px 16px rgba(230, 57, 70, 0.15)';
    } else {
      navbar.style.padding = '15px 0';
      navbar.style.boxShadow = '0 4px 12px rgba(230, 57, 70, 0.08)';
    }
  });
});