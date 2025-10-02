export const generateUseCaseDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Diagramme de Cas d\'Utilisation', width / 2, 40);

  ctx.font = '14px Arial';
  ctx.fillText('Système de Gestion des Stagiaires', width / 2, 70);

  const drawActor = (x: number, y: number, label: string) => {
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + 15);
    ctx.lineTo(x, y + 45);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - 20, y + 25);
    ctx.lineTo(x + 20, y + 25);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + 45);
    ctx.lineTo(x - 15, y + 70);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y + 45);
    ctx.lineTo(x + 15, y + 70);
    ctx.stroke();

    ctx.fillText(label, x, y + 90);
  };

  const drawUseCase = (x: number, y: number, w: number, h: number, label: string) => {
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#f0f0f0';
    ctx.fill();
    ctx.fillStyle = '#000000';

    const words = label.split(' ');
    let line = '';
    let lines: string[] = [];

    for (let word of words) {
      const testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > w * 1.5) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const lineHeight = 14;
    const startY = y - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((l, i) => {
      ctx.fillText(l.trim(), x, startY + i * lineHeight);
    });
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
  };

  ctx.strokeRect(150, 120, 500, 480);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('Système', 400, 140);

  drawActor(80, 200, 'Admin');
  drawActor(80, 380, 'Manager');
  drawActor(720, 290, 'Stagiaire');

  const useCases = [
    { x: 280, y: 180, label: 'Gérer Stagiaires' },
    { x: 280, y: 260, label: 'Gérer Projets' },
    { x: 280, y: 340, label: 'Gérer Tâches' },
    { x: 520, y: 180, label: 'Voir Dashboard' },
    { x: 520, y: 260, label: 'Générer Rapports' },
    { x: 520, y: 340, label: 'Suivre Progression' },
    { x: 400, y: 480, label: 'Configurer Système' },
    { x: 520, y: 420, label: 'Consulter Notifications' },
  ];

  useCases.forEach(uc => {
    drawUseCase(uc.x, uc.y, 70, 30, uc.label);
  });

  drawLine(95, 220, 210, 180);
  drawLine(95, 220, 210, 260);
  drawLine(95, 220, 210, 340);
  drawLine(95, 220, 330, 480);

  drawLine(95, 400, 210, 260);
  drawLine(95, 400, 210, 340);
  drawLine(95, 400, 450, 180);
  drawLine(95, 400, 450, 260);

  drawLine(705, 290, 590, 260);
  drawLine(705, 290, 590, 340);
  drawLine(705, 290, 590, 420);
};

export const generateClassDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Diagramme de Classes', width / 2, 40);

  const drawClass = (x: number, y: number, w: number, className: string, attributes: string[], methods: string[]) => {
    const headerHeight = 35;
    const attrHeight = attributes.length * 20 + 10;
    const methodHeight = methods.length * 20 + 10;
    const totalHeight = headerHeight + attrHeight + methodHeight;

    ctx.fillStyle = '#e3f2fd';
    ctx.fillRect(x, y, w, headerHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y + headerHeight, w, attrHeight);
    ctx.fillRect(x, y + headerHeight + attrHeight, w, methodHeight);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, totalHeight);
    ctx.beginPath();
    ctx.moveTo(x, y + headerHeight);
    ctx.lineTo(x + w, y + headerHeight);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + headerHeight + attrHeight);
    ctx.lineTo(x + w, y + headerHeight + attrHeight);
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(className, x + w / 2, y + 22);

    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    attributes.forEach((attr, i) => {
      ctx.fillText(attr, x + 10, y + headerHeight + 20 + i * 20);
    });

    methods.forEach((method, i) => {
      ctx.fillText(method, x + 10, y + headerHeight + attrHeight + 20 + i * 20);
    });

    return totalHeight;
  };

  const drawArrow = (x1: number, y1: number, x2: number, y2: number, type: string) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1.5;
    if (type === 'inheritance') {
      ctx.setLineDash([]);
    } else if (type === 'association') {
      ctx.setLineDash([5, 5]);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowSize = 10;

    if (type === 'inheritance') {
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - arrowSize * Math.cos(angle - Math.PI / 6), y2 - arrowSize * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - arrowSize * Math.cos(angle + Math.PI / 6), y2 - arrowSize * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
    }
  };

  drawClass(50, 80, 200, 'Intern',
    ['- id: string', '- name: string', '- email: string', '- department: string', '- status: string', '- progress: number'],
    ['+ getProgress(): number', '+ updateStatus(): void']);

  drawClass(300, 80, 200, 'Project',
    ['- id: string', '- title: string', '- status: string', '- completion: number', '- dueDate: string'],
    ['+ addIntern(): void', '+ updateStatus(): void', '+ getCompletion(): number']);

  drawClass(550, 80, 200, 'Task',
    ['- id: string', '- title: string', '- status: string', '- priority: string', '- dueDate: string'],
    ['+ assignTo(): void', '+ updateStatus(): void', '+ setPriority(): void']);

  drawClass(175, 320, 200, 'Activity',
    ['- id: string', '- user: User', '- action: string', '- timestamp: string'],
    ['+ log(): void', '+ getHistory(): Activity[]']);

  drawClass(425, 320, 200, 'Notification',
    ['- id: string', '- title: string', '- message: string', '- type: string', '- read: boolean'],
    ['+ markAsRead(): void', '+ send(): void']);

  drawArrow(150, 220, 275, 300, 'association');
  drawArrow(400, 220, 525, 300, 'association');
  drawArrow(250, 190, 300, 150, 'association');
  drawArrow(500, 150, 550, 150, 'association');
};

export const generateSequenceDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Diagramme de Séquence', width / 2, 40);
  ctx.font = '14px Arial';
  ctx.fillText('Création d\'une nouvelle tâche', width / 2, 65);

  const actors = [
    { x: 100, label: 'Utilisateur' },
    { x: 250, label: 'UI' },
    { x: 400, label: 'Controller' },
    { x: 550, label: 'Service' },
    { x: 700, label: 'Database' }
  ];

  ctx.font = 'bold 12px Arial';
  actors.forEach(actor => {
    ctx.fillStyle = '#2196F3';
    ctx.fillRect(actor.x - 40, 90, 80, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(actor.label, actor.x, 110);

    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(actor.x, 120);
    ctx.lineTo(actor.x, 580);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  const drawMessage = (x1: number, y: number, x2: number, label: string, isReturn = false) => {
    ctx.strokeStyle = isReturn ? '#666666' : '#000000';
    ctx.lineWidth = 2;
    ctx.setLineDash(isReturn ? [5, 5] : []);
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
    ctx.setLineDash([]);

    if (!isReturn) {
      const arrowSize = 8;
      ctx.beginPath();
      ctx.moveTo(x2, y);
      ctx.lineTo(x2 - arrowSize, y - arrowSize / 2);
      ctx.lineTo(x2 - arrowSize, y + arrowSize / 2);
      ctx.closePath();
      ctx.fillStyle = '#000000';
      ctx.fill();
    }

    ctx.fillStyle = '#000000';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    const midX = (x1 + x2) / 2;
    ctx.fillText(label, midX, y - 5);
  };

  const drawActivation = (x: number, y1: number, y2: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.fillRect(x - 5, y1, 10, y2 - y1);
    ctx.strokeRect(x - 5, y1, 10, y2 - y1);
  };

  let y = 150;
  drawMessage(actors[0].x, y, actors[1].x, '1: Cliquer "Nouvelle tâche"');
  drawActivation(actors[1].x, y, y + 320);

  y += 40;
  drawMessage(actors[1].x, y, actors[1].x + 80, '2: Afficher formulaire');

  y += 40;
  drawMessage(actors[0].x, y, actors[1].x, '3: Remplir formulaire');

  y += 40;
  drawMessage(actors[0].x, y, actors[1].x, '4: Soumettre');

  y += 40;
  drawMessage(actors[1].x, y, actors[2].x, '5: createTask(data)');
  drawActivation(actors[2].x, y, y + 120);

  y += 40;
  drawMessage(actors[2].x, y, actors[3].x, '6: validateTask(data)');
  drawActivation(actors[3].x, y, y + 80);

  y += 40;
  drawMessage(actors[3].x, y, actors[4].x, '7: save(task)');
  drawActivation(actors[4].x, y, y + 40);

  y += 40;
  drawMessage(actors[4].x, y, actors[3].x, '8: taskId', true);

  y += 40;
  drawMessage(actors[3].x, y, actors[2].x, '9: success', true);

  y += 40;
  drawMessage(actors[2].x, y, actors[1].x, '10: task created', true);

  y += 40;
  drawMessage(actors[1].x, y, actors[0].x, '11: Afficher confirmation', true);
};

export const generateActivityDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Diagramme d\'Activité', width / 2, 40);
  ctx.font = '14px Arial';
  ctx.fillText('Processus d\'affectation de tâche', width / 2, 65);

  const drawCircle = (x: number, y: number, r: number, filled = false) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    if (filled) {
      ctx.fillStyle = '#000000';
      ctx.fill();
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawActivity = (x: number, y: number, w: number, h: number, label: string) => {
    ctx.fillStyle = '#bbdefb';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    const radius = 15;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    const words = label.split(' ');
    let line = '';
    let lines: string[] = [];

    for (let word of words) {
      const testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > w - 20) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const lineHeight = 14;
    const startY = y + h / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((l, i) => {
      ctx.fillText(l.trim(), x + w / 2, startY + i * lineHeight);
    });
  };

  const drawDecision = (x: number, y: number, size: number, label: string) => {
    ctx.fillStyle = '#fff9c4';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 4);
  };

  const drawArrow = (x1: number, y1: number, x2: number, y2: number, label = '') => {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowSize = 10;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - arrowSize * Math.cos(angle - Math.PI / 6), y2 - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - arrowSize * Math.cos(angle + Math.PI / 6), y2 - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();

    if (label) {
      ctx.font = '11px Arial';
      ctx.fillText(label, (x1 + x2) / 2 + 15, (y1 + y2) / 2);
    }
  };

  const centerX = width / 2;

  drawCircle(centerX, 100, 15, true);
  drawArrow(centerX, 115, centerX, 140);

  drawActivity(centerX - 80, 140, 160, 40, 'Sélectionner projet');
  drawArrow(centerX, 180, centerX, 210);

  drawActivity(centerX - 80, 210, 160, 40, 'Créer nouvelle tâche');
  drawArrow(centerX, 250, centerX, 290);

  drawDecision(centerX, 310, 80, 'Stagiaire\ndisponible?');
  drawArrow(centerX, 350, centerX, 380, 'Oui');

  drawActivity(centerX - 80, 380, 160, 40, 'Affecter au stagiaire');
  drawArrow(centerX, 420, centerX, 450);

  drawActivity(centerX - 80, 450, 160, 40, 'Envoyer notification');
  drawArrow(centerX, 490, centerX, 520);

  drawActivity(centerX - 80, 520, 160, 40, 'Mettre à jour dashboard');
  drawArrow(centerX, 560, centerX, 590);

  drawCircle(centerX, 605, 15);
  drawCircle(centerX, 605, 10, true);

  drawArrow(centerX - 40, 310, 150, 310, 'Non');
  drawActivity(80, 290, 140, 40, 'Mettre en attente');
  drawArrow(150, 270, 150, 180);
  drawArrow(150, 180, centerX - 80, 180);
};

export const generateComponentDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Diagramme de Composants', width / 2, 40);
  ctx.font = '14px Arial';
  ctx.fillText('Architecture de l\'application', width / 2, 65);

  const drawComponent = (x: number, y: number, w: number, h: number, name: string, items: string[]) => {
    ctx.fillStyle = '#e1f5fe';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 10, y - 8, 30, 16);
    ctx.strokeRect(x + 10, y - 8, 30, 16);
    ctx.fillRect(x + 15, y - 8, 8, 16);
    ctx.strokeRect(x + 15, y - 8, 8, 16);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(name, x + 50, y + 20);

    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 30);
    ctx.lineTo(x + w - 10, y + 30);
    ctx.stroke();

    ctx.font = '11px Arial';
    items.forEach((item, i) => {
      ctx.fillText('• ' + item, x + 15, y + 50 + i * 18);
    });
  };

  const drawArrow = (x1: number, y1: number, x2: number, y2: number, label = '') => {
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowSize = 8;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - arrowSize * Math.cos(angle - Math.PI / 6), y2 - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - arrowSize * Math.cos(angle + Math.PI / 6), y2 - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = '#666666';
    ctx.fill();

    if (label) {
      ctx.fillStyle = '#000000';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 5);
    }
  };

  drawComponent(50, 100, 180, 120, 'Presentation Layer', [
    'Dashboard',
    'Interns View',
    'Projects View',
    'Kanban Board',
    'Reports'
  ]);

  drawComponent(280, 100, 180, 120, 'UI Components', [
    'Header',
    'Sidebar',
    'Modal',
    'Charts',
    'Forms'
  ]);

  drawComponent(510, 100, 180, 120, 'Context/State', [
    'ThemeContext',
    'AuthContext',
    'DataContext',
    'State Management'
  ]);

  drawComponent(165, 280, 180, 100, 'Business Logic', [
    'Task Management',
    'Project Management',
    'User Management',
    'Notifications'
  ]);

  drawComponent(395, 280, 180, 100, 'Services', [
    'API Service',
    'Auth Service',
    'Storage Service',
    'PDF Generator'
  ]);

  drawComponent(280, 440, 180, 100, 'Data Layer', [
    'Supabase Client',
    'Database',
    'Mock Data',
    'Types/Interfaces'
  ]);

  drawArrow(140, 220, 255, 280, 'uses');
  drawArrow(230, 220, 300, 280);
  drawArrow(600, 220, 485, 280);
  drawArrow(255, 380, 320, 440, 'queries');
  drawArrow(485, 380, 420, 440);
  drawArrow(370, 220, 370, 280, 'manages');
  drawArrow(230, 150, 280, 150);
  drawArrow(460, 150, 510, 150);
};
