import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NgIf} from "@angular/common";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {NameDialogComponent} from "../name-dialog/name-dialog.component";
import {CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {CreateTestCaseComponent} from "../create-test-case/create-test-case.component";
import {FullscreenModalComponent} from "../fullscreen-modal/fullscreen-modal.component";
import {TestCaseService} from "../../services/test-case.service";
import {Subscription} from "rxjs";

interface TreeNode {
  name: string;
  type: 'folder' | 'test-case' | 'check-list';
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  type: 'folder' | 'test-case' | 'check-list';
  level: number;
}

const TREE_DATA: TreeNode[] = []

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatMenuTrigger, MatMenu, NgIf, MatMenuItem, CdkDropList, FullscreenModalComponent, CreateTestCaseComponent]
})
export class PackagesComponent implements OnInit {

  private eventSubscription: Subscription | undefined;

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public dialog: MatDialog,
    private testCaseService: TestCaseService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {

  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  drop(event: CdkDragDrop<FlatNode[]>): void {
    if (!event.isPointerOverContainer) {
      return;
    }

    const draggedNode = event.item.data;
    const parentNode = this.getParentTreeNodeByFlatNode(draggedNode);
    const targetNode = event.container.data[event.currentIndex];

    if (draggedNode && targetNode) {
      this.moveNode(draggedNode, parentNode, targetNode);
    }

    this.updateTreeControl();
  }

  moveNode(draggedNode: FlatNode, parentNode: TreeNode | null, targetNode: FlatNode): void {
    if (parentNode) {
      parentNode.children = parentNode.children?.filter(child => child.name !== draggedNode.name);
    } else {
      this.dataSource.data = this.dataSource.data.filter(node => node.name !== draggedNode.name);
    }

    const targetTreeNode = this.getTreeNodeByFlatNode(targetNode);
    if (targetTreeNode.children) {
      targetTreeNode.children.push(this.getTreeNodeByFlatNode(draggedNode));
    } else {
      targetTreeNode.children = [this.getTreeNodeByFlatNode(draggedNode)];
    }
  }

  addSuites(node: FlatNode): void {
    const parentNode = this.getTreeNodeByFlatNode(node);
    const newNode: TreeNode = {name: 'New Suite', type: 'folder', children: []};
    if (parentNode.children) {
      parentNode.children.push(newNode);
    } else {
      parentNode.children = [newNode];
    }
    this.updateTreeControl();
  }

  collapseAllChildren(node: FlatNode): void {
    this.treeControl.dataNodes.forEach(descendant => this.treeControl.collapse(descendant));
  }

  addFolder(node: FlatNode): void {
    this.openDialog('Add Folder').afterClosed().subscribe(folderName => {
      if (folderName) {
        const parentNodeIndex = this.treeControl.dataNodes.indexOf(node);
        if (parentNodeIndex !== -1) {
          const newFolder: TreeNode = {name: folderName, type: 'folder', children: []};
          const newFolderFlatNode: FlatNode = {
            name: folderName,
            type: 'folder',
            level: node.level + 1,
            expandable: true
          };
          const parentTreeNode = this.getTreeNodeByFlatNode(node);
          if (parentTreeNode.children) {
            parentTreeNode.children.push(newFolder);
          } else {
            parentTreeNode.children = [newFolder];
          }
          this.updateTreeControl();
          this.treeControl.expand(node);
        }
      }
    });
  }

  addRootFolder(): void {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '300px',
      data: {name: '', action: 'Добавить папку'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newFolder: TreeNode = {
          name: result,
          type: 'folder',
          children: []
        };
        this.dataSource.data.push(newFolder);
        this.updateTreeControl();
      }
    });


  }

  deleteFolder(node: FlatNode): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Подтверждение удаления',
        message: `Вы уверены, что хотите удалить папку "${node.name}" и все её содержимое?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const parentTreeNode = this.getParentTreeNodeByFlatNode(node);
        if (parentTreeNode && parentTreeNode.children) {
          parentTreeNode.children = parentTreeNode.children.filter(child => child.name !== node.name);
        } else {
          const index = this.dataSource.data.indexOf(this.getTreeNodeByFlatNode(node));
          if (index > -1) {
            this.dataSource.data.splice(index, 1);
          }
        }
        this.updateTreeControl();
      }
    });
  }

  editFolderName(node: FlatNode): void {
    this.openDialog('Edit Folder Name', node.name).afterClosed().subscribe(folderName => {
      if (folderName) {
        const treeNode = this.getTreeNodeByFlatNode(node);
        treeNode.name = folderName;
        node.name = folderName;
        this.updateTreeControl();
      }
    });
  }

  addTestCase(node: FlatNode): void {
    console.log("node: ", node);
    this.openModal();
    this.testCaseService.setFolderNameInTestCase(node.name);
    this.eventSubscription = this.testCaseService.event$.subscribe(() => {
      const testCaseName = this.testCaseService.getTestCaseName();
      if (testCaseName) {
      const parentNodeIndex = this.treeControl.dataNodes.indexOf(node);
        if (parentNodeIndex !== -1) {
          const newTestCase: TreeNode = {name: testCaseName, type: 'test-case'};
          const parentTreeNode = this.getTreeNodeByFlatNode(node);
          if (parentTreeNode.children) {
            parentTreeNode.children.push(newTestCase);
          } else {
            parentTreeNode.children = [newTestCase];
          }
          this.updateTreeControl();
          this.treeControl.expand(node);
        }
      }
    });
  }
  openCreateTestCase(title: string): MatDialogRef<CreateTestCaseComponent> {
    return this.dialog.open(CreateTestCaseComponent, {
      // width: '100%',
      data: {title}
    });
  }


  addChecklist(node: FlatNode): void {
    this.openCreateTestCase('Add Checklist').afterClosed().subscribe(checklistName => {
      if (checklistName) {
        const parentNodeIndex = this.treeControl.dataNodes.indexOf(node);
        if (parentNodeIndex !== -1) {
          const newChecklist: TreeNode = {name: checklistName, type: 'check-list'};
          const parentTreeNode = this.getTreeNodeByFlatNode(node);
          if (parentTreeNode.children) {
            parentTreeNode.children.push(newChecklist);
          } else {
            parentTreeNode.children = [newChecklist];
          }
          this.updateTreeControl();
          this.treeControl.expand(node);
        }
      }
    });
  }

  editNode(node: FlatNode): void {
    this.openDialog('Edit Name', node.name).afterClosed().subscribe(name => {
      if (name) {
        const treeNode = this.getTreeNodeByFlatNode(node);
        if (treeNode) {
          treeNode.name = name;
          this.updateTreeControl();
        }
      }
    });
  }


  deleteNode(node: FlatNode): void {
    const parentNodeIndex = this.treeControl.dataNodes.indexOf(node);
    if (parentNodeIndex !== -1) {
      const parentTreeNode = this.getTreeNodeByFlatNode(node);
      if (parentTreeNode) {
        parentTreeNode.children = parentTreeNode.children?.filter(child => child.name !== node.name) || [];
        this.updateTreeControl();
      }
    }
  }

  openDialog(action: string, currentName: string = ''): MatDialogRef<NameDialogComponent, string> {
    return this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: {name: currentName, action}
    });
  }


  private getTreeNodeByFlatNode(flatNode: FlatNode): TreeNode {
    return <TreeNode>this.findTreeNode(this.dataSource.data, flatNode.name, flatNode.level);
  }

  private getParentTreeNodeByFlatNode(flatNode: FlatNode): TreeNode | null {
    return this.findParentTreeNode(this.dataSource.data, flatNode.name, flatNode.level);
  }

  private findTreeNode(treeNodes: TreeNode[], name: string, level: number): TreeNode | null {
    for (let node of treeNodes) {
      if (node.name === name && level === 0) {
        return node;
      } else if (node.children) {
        const result = this.findTreeNode(node.children, name, level - 1);
        if (result) return result;
      }
    }
    return null;
  }

  private findParentTreeNode(treeNodes: TreeNode[], name: string, level: number): TreeNode | null {
    for (let node of treeNodes) {
      if (node.children) {
        for (let child of node.children) {
          if (child.name === name && level - 1 === 0) {
            return node;
          }
        }
        const result = this.findParentTreeNode(node.children, name, level - 1);
        if (result) return result;
      }
    }
    return null;
  }


  private updateTreeControl(): void {
    const expandedNodeNames = this.saveExpandedState();
    this.dataSource.data = [...this.dataSource.data]; // Trigger data update
    this.restoreExpandedState(expandedNodeNames);
  }

  // Отслеживание состояния узлов
  private saveExpandedState(): Set<string> {
    const expandedNodeNames = new Set<string>();
    this.treeControl.dataNodes.forEach(node => {
      if (this.treeControl.isExpanded(node)) {
        expandedNodeNames.add(node.name);
      }
    });
    return expandedNodeNames;
  }

  private restoreExpandedState(expandedNodeNames: Set<string>): void {
    this.treeControl.dataNodes.forEach(node => {
      if (expandedNodeNames.has(node.name)) {
        this.treeControl.expand(node);
      }
    });
  }



  // Modal window
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  handleModalClose() {
    this.isModalOpen = false;
  }
}
