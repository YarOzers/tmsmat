import { Component, Inject } from '@angular/core';
import { MatTreeModule, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { NgIf } from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

export interface FlatNode {
  expandable: boolean;
  name: string;
  type: string;
  level: number;
}

interface TreeNode {
  name: string;
  type: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'components',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'cdk',
            type: 'folder',
            children: [
              { name: 'package.json', type: 'file' },
              { name: 'BUILD.bazel', type: 'file' },
            ]
          },
          { name: 'material', type: 'folder' }
        ]
      }
    ]
  },
  {
    name: 'angular',
    type: 'folder',
    children: [
      {
        name: 'packages',
        type: 'folder',
        children: [
          { name: '.travis.yml', type: 'file' },
          { name: 'firebase.json', type: 'file' }
        ]
      },
      { name: 'package.json', type: 'file' }
    ]
  },
  {
    name: 'angularjs',
    type: 'folder',
    children: [
      { name: 'gulpfile.js', type: 'file' },
      { name: 'README.md', type: 'file' }
    ]
  }
];

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatMenuTrigger, MatMenu, NgIf, MatMenuItem]
})
export class PackagesComponent {

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

  constructor(public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  collapseAllChildren(node: FlatNode): void {
    this.treeControl.dataNodes.forEach(descendant => this.treeControl.collapse(descendant));
  }

  addFolder(node: FlatNode): void {
    this.openDialog('Add Folder').afterClosed().subscribe(folderName => {
      if (folderName) {
        const parentNodeIndex = this.treeControl.dataNodes.indexOf(node);
        if (parentNodeIndex !== -1) {
          const newFolder: TreeNode = { name: folderName, type: 'folder', children: [] };
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

  deleteFolder(node: FlatNode): void {
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
    this.openDialog('Add Test Case').afterClosed().subscribe(testCaseName => {
      if (testCaseName) {
        const parentNodeIndex = this.treeControl.dataNodes.indexOf(node);
        if (parentNodeIndex !== -1) {
          const newTestCase: TreeNode = { name: testCaseName, type: 'file' };
          const newTestCaseFlatNode: FlatNode = {
            name: testCaseName,
            type: 'file',
            level: node.level + 1,
            expandable: false
          };
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

  addChecklist(node: FlatNode): void {
    this.openDialog('Add Checklist').afterClosed().subscribe(checklistName => {
      if (checklistName) {
        const parentNodeIndex = this.treeControl.dataNodes.indexOf(node);
        if (parentNodeIndex !== -1) {
          const newChecklist: TreeNode = { name: checklistName, type: 'file' };
          const newChecklistFlatNode: FlatNode = {
            name: checklistName,
            type: 'file',
            level: node.level + 1,
            expandable: false
          };
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

  editFile(node: FlatNode): void {
    this.openDialog('Edit File Name', node.name).afterClosed().subscribe(fileName => {
      if (fileName) {
        const treeNode = this.getTreeNodeByFlatNode(node);
        treeNode.name = fileName;
        node.name = fileName;
        this.updateTreeControl();
      }
    });
  }

  deleteFile(node: FlatNode): void {
    const nodeIndex = this.treeControl.dataNodes.indexOf(node);
    if (nodeIndex !== -1) {
      this.treeControl.dataNodes.splice(nodeIndex, 1);
      const parentTreeNode = this.getParentTreeNodeByFlatNode(node);
      if (parentTreeNode && parentTreeNode.children) {
        parentTreeNode.children = parentTreeNode.children.filter(child => child.name !== node.name);
      }
      this.updateTreeControl();
    }
  }

  openDialog(action: string, currentName: string = ''): MatDialogRef<NameDialogComponent, string> {
    return this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: { name: currentName, action }
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
    const expandedNodeNames = new Set<string>();
    this.treeControl.dataNodes.forEach(node => {
      if (this.treeControl.isExpanded(node)) {
        expandedNodeNames.add(node.name);
      }
    });
    this.dataSource.data = [...this.dataSource.data]; // Trigger data update
    this.treeControl.dataNodes.forEach(node => {
      if (expandedNodeNames.has(node.name)) {
        this.treeControl.expand(node);
      }
    });
  }
}

@Component({
  selector: 'name-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.action }}</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="data.name" placeholder="Name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSave()">Save</button>
    </div>
  `,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton
  ],
  standalone: true
})
export class NameDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, action: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.name);
  }
}
